function Tetris(){
	this.canvas= document.querySelector("#canvas");
	this.ctx= this.canvas.getContext('2d');
	this.W= this.canvas.width;
	this.H= this.canvas.height;
	this.Bw= 40;
	this.Bh= 40;

	var self= this;
	this.handleKeyDown= function (e){
		switch(e.keyCode){
			case 32:
				clearInterval(self.down);
				function down(){
					if(self.next()){
						self.NextBlock();
						return;
					}else{
						for(var i=0; i<self.Ny.length; i++)
							self.Ny[i]++;
					}
					if(self.E){
						self.end();
					}
					down();
				}
				down();
				self.down= setInterval(function(){self.update()}, 1000);
				break;
			case 38:
				var Ix= [];
				var Iy= [];
				switch(self.ShapeList[self.cnt]){
					case "I":
						if(self.T%2==0){
							var Ay= self.Ny[0]+1>19? -3: -2;
							for(var i=0; i<4; i++){
								Ix.push(self.T==0? self.Nx[0]+2: self.Nx[0]+1);
								Iy.push( (self.Nx[i]-self.Nx[0]) + self.Ny[0]+Ay);
							}
						}else{
							if(self.Nx[0]+(self.T==1? 1: 2) >= 10){
								Ix=[6, 7, 8, 9];
								Iy= [self.Ny[0]+2, self.Ny[0]+2, self.Ny[0]+2, self.Ny[0]+2];
							}else{
								var An= self.T==1? -2: -1;
								var Lw= An;
								for(var i=0; i< -An+1; i++){
									if((self.arr[self.Ny[0]+2] != undefined && self.arr[self.Ny[0]+2][self.Nx[0]+An+i] != 0))
										Lw= An+i+1;
								}
								for(var i=0; i< 4; i++){
									Ix.push(self.Nx[0]+Lw+i);
									Iy.push(self.Ny[0]+2);
								}
							}
						}
						break;
					case "T":
						Ix.push(self.Nx[0]);
						Iy.push(self.Ny[0]);
						if(self.Nx[0]-1 == undefined || self.arr[self.Ny[0]][self.Nx[0]-1] != 0)
							Ix[0]++;
						if(self.Nx[0]+1 == undefined || self.arr[self.Ny[0]][self.Nx[0]+1] != 0)
							Ix[0]--;
						if(self.Ny[0]==19)
							Iy[0]--;
						if(self.Ny[0]==0)
							Iy[0]++;
						if(self.T%2==0){
							Ix.push(self.T==0? Ix[0]+1: Ix[0]-1, Ix[0], Ix[0]);
							Iy.push(Iy[0], Iy[0]+1, Iy[0]-1);
						}else{
							Ix.push(Ix[0], Ix[0]-1, Ix[0]+1);
							Iy.push(self.T==1? Iy[0]+1: Iy[0]-1, Iy[0], Iy[0]);
						}
						break;
					case "L":
						Ix.push(self.Nx[0]);
						Iy.push(self.Ny[0]);
						if(self.Nx[0]-1 == undefined || self.arr[self.Ny[0]][self.Nx[0]-1] != 0)
							Ix[0]++;
						if(self.Nx[0]+1 == undefined || self.arr[self.Ny[0]][self.Nx[0]+1] != 0)
							Ix[0]--;
						if(self.Ny[0]==19)
							Iy[0]--;
						if(self.Ny[0]==0)
							Iy[0]++;
						if(self.T%2 == 0){
							if(self.arr[self.T==0? Iy[0]-1: Iy[0]+1][self.T==0? Ix[0]+1: Ix[0]-1] != 0 || self.arr[Iy[0]-1][Ix[0]] != 0 || self.arr[Iy[0]+1][Ix[0]] != 0)
								return;
							Ix.push(self.T==0? Ix[0]+1: Ix[0]-1, Ix[0], Ix[0]);
							Iy.push(self.T==0? Iy[0]-1: Iy[0]+1, Iy[0]-1, Iy[0]+1);
						}else{
							if(self.arr[self.T==1? Iy[0]+1: Iy[0]-1][self.T==1? Ix[0]+1: Ix[0]-1] != 0 || self.arr[Iy[0]][Ix[0]-1] != 0 || self.arr[Iy[0]][Ix[0]+1] != 0)
								return;
							Ix.push(self.T==1? Ix[0]+1: Ix[0]-1, Ix[0]-1, Ix[0]+1);
							Iy.push(self.T==1? Iy[0]+1: Iy[0]-1, Iy[0], Iy[0]);
						}
						break;
					case "J":
						Ix.push(self.Nx[0]);
						Iy.push(self.Ny[0]);
						if(self.Nx[0]-1 == undefined || self.arr[self.Ny[0]][self.Nx[0]-1] != 0)
							Ix[0]++;
						if(self.Nx[0]+1 == undefined || self.arr[self.Ny[0]][self.Nx[0]+1] != 0)
							Ix[0]--;
						if(self.Ny[0]==19)
							Iy[0]--;
						if(self.Ny[0]==0)
							Iy[0]++;
						if(self.T%2 == 0){
							Ix.push(self.T==0? Ix[0]+1: Ix[0]-1, Ix[0], Ix[0]);
							Iy.push(self.T==0? Iy[0]+1: Iy[0]-1, Iy[0]-1, Iy[0]+1);
						}else{
							Ix.push(self.T==1? Ix[0]-1: Ix[0]+1, Ix[0]-1, Ix[0]+1);
							Iy.push(self.T==1? Iy[0]+1: Iy[0]-1, Iy[0], Iy[0]);
						}
						break;
					case "S":
						Ix.push(self.Nx[0]);
						Iy.push(self.Ny[0]);
						if( (self.arr[self.Ny[0]] != undefined && self.arr[Iy[0]][Ix[0]-1] == undefined) || (self.arr[self.Ny[0]] != undefined && self.arr[self.Ny[0]][self.Nx[0]-1] != 0))
							Ix[0]++;
						if(self.Nx[0]+1 == undefined || (self.arr[self.Ny[0]] != undefined && self.arr[self.Ny[0]][self.Nx[0]+1] != 0))
							Ix[0]--;
						if(self.Ny[0]==19)
							Iy[0]--;
						if(self.Ny[0]==0)
							Iy[0]++;
						if(self.T%2 == 0){
							Ix.push(Ix[0], Ix[0]-1+self.T, Ix[0]-1+self.T);
							Iy.push(Iy[0]+1-self.T, self.T==0? Iy[0]-1: Iy[0]+1, Iy[0]);
						}else{
							Ix.push(Ix[0], Ix[0]+1, Ix[0]-1);
							Iy.push(Iy[0]-2+self.T, Iy[0]-1.5+self.T*0.5, Iy[0]-0.5+self.T*0.5);
						}
						break;
					case "Z":
						Ix.push(self.Nx[0]);
						Iy.push(self.Ny[0]);
						if( self.Nx[0]-1 == undefined || (self.arr[self.Ny[0]] != undefined && self.arr[self.Ny[0]][self.Nx[0]-1] != 0))
							Ix[0]++;
						if(self.Nx[0]+1 == undefined || (self.arr[self.Ny[0]] != undefined && self.arr[self.Ny[0]][self.Nx[0]+1] != 0))
							Ix[0]--;
						if(self.Ny[0]==19)
							Iy[0]--;
						if(self.Ny[0]==0)
							Iy[0]++;
						if(self.T%2 == 0){
							Ix.push(Ix[0], Ix[0]-1+self.T, Ix[0]-1+self.T);
							Iy.push(Iy[0]-1+self.T, Iy[0], Iy[0]+1-self.T);
						}else{
							Ix.push(Ix[0]-1, Ix[0], Ix[0]+1);
							Iy.push(Iy[0]-1.5+self.T*0.5, Iy[0]-2+self.T, Iy[0]-0.5+self.T*0.5);
						}
						break;
					case "O":
						Ix= self.Nx;
						Iy= self.Ny;
				}
				for(var i=0; i<Ix.length; i++){
					if( self.arr[Iy[i]] != undefined && self.arr[Iy[i]][Ix[i]] != 0)
						return;
				}
				self.Nx= Ix;
				self.Ny= Iy;
				self.T++;
				if(self.T>3)
					self.T=0;
				break;
			case 37:
			case 39:
				for(var i=0; i<4; i++){
					if(self.Nx[i] == (e.keyCode == 37? 0: 9))
						return false;
					if(self.arr[self.Ny[i]] != undefined && self.arr[self.Ny[i]][self.Nx[i]+(e.keyCode == 37? -1: 1)] != 0)
						return false;
				}
				for(var i=0; i<4; i++)
					self.Nx[i]+= (e.keyCode == 37? -1: 1);
				break;
			case 40:
				clearInterval(self.down);
				if(self.next()){
					self.NextBlock()
				}else{
					for(var i=0; i<self.Ny.length; i++)
						self.Ny[i]++;
				}
				if(self.E)
					self.end();
				self.down= setInterval(function(){self.update()}, 1000);
				break;
		}
	}
}
Tetris.prototype.init= function (){
	this.arr= [];
	for(var i=0; i<20; i++)
		this.arr.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	this.ShapeList= [];
	for(var i=0; i<500; i++)
		this.sort();
	this.E= false;
	this.cnt= 0;
	this.T= 0;
	this.score= 0;
	this.Nx= this.getPos(true, this.ShapeList[this.cnt]);
	this.Ny= this.getPos(false, this.ShapeList[this.cnt]);

	window.addEventListener("keydown", this.handleKeyDown);
	var self= this;
	this.down= setInterval(function(){self.update()}, 1000);
	this.display();
};
Tetris.prototype.getPos= function(xy, tg) {
	switch(tg){
		case "I":
			return xy? [3, 4, 5, 6]: [-1, -1, -1, -1];
		case "O":
			return xy? [3, 4, 3, 4]: [-1, -1, 0, 0];
		case "T":
			return xy? [4, 3, 4, 5]: [0, 0, -1, 0];
		case "L":
			return xy? [4, 3, 3, 5]: [0, -1, 0, 0];
		case "J":
			return xy? [4, 5, 3, 5]: [0, -1, 0, 0];
		case "S":
			return xy? [4, 4, 5, 3]: [-1, 0, -1, 0];
		case "Z":
			return xy? [4, 3, 4, 5]: [-1, -1, 0, 0];
	}
};
Tetris.prototype.update= function (){
	if(this.next()){
		this.NextBlock()
	}else{
		for(var i=0; i<this.Ny.length; i++)
			this.Ny[i]++;
	}
	if(this.E)
		this.end();
};
Tetris.prototype.display= function (){
	this.ctx.clearRect(0, 0, this.W, this.H);
	this.ctx.beginPath();
	for(var j=0; j<= 20; j++){
		this.ctx.moveTo(0, j*this.Bh+20);
		this.ctx.lineTo(400, j*this.Bh+20);
		this.ctx.stroke();
	}
	for(var i=0; i<= 10; i++){
		this.ctx.moveTo(i*this.Bw, 0);
		this.ctx.lineTo(i*this.Bw, this.H);
		this.ctx.stroke();
	}
	this.ctx.moveTo(420, 70);
	this.ctx.lineTo(420, 280);
	this.ctx.lineTo(490, 280);
	this.ctx.lineTo(490, 70);
	this.ctx.lineTo(420, 70);
	this.ctx.moveTo(420, 140);
	this.ctx.lineTo(490, 140);
	this.ctx.moveTo(420, 210);
	this.ctx.lineTo(490, 210);
	this.ctx.stroke();
	this.ctx.closePath();
	this.ctx.font= "100 23px Arial";
	this.ctx.fillText("NEXT", 425, 50);
	for(var i= 1; i<4; i++){
		this.preview(this.ShapeList[this.cnt+i], i-1);
	}
	this.ctx.font= "100 20px Arial";
	this.ctx.fillText("SCORE", 420, 330);
	this.ctx.save();
	this.ctx.textAlign = "center"; 
	this.ctx.fillText(this.score, 455, 360);
	this.ctx.restore();
	var c="";
	for(var i=0; i< 20; i++){
		for(var j=0; j< 10; j++){
			if(this.arr[i][j] != 0){
				switch(this.arr[i][j]){
					case "I":
						c= "#364fc7";
						break;
					case "O":
						c= "#fcc419";
						break;
					case "T":
						c= "#845ef7";
						break;
					case "L":
						c= "#e8590c";
						break;
					case "J":
						c= "#74c0fc";
						break;
					case "S":
						c= "#8ce99a";
						break;
					case "Z":
						c= "#f03e3e";
						break;
				}
				this.block(j, i, c);
			}
		}
	}
	switch(this.ShapeList[this.cnt]){
		case "I":
			c= "#364fc7";
			break;
		case "O":
			c= "#fcc419";
			break;
		case "T":
			c= "#845ef7";
			break;
		case "L":
			c= "#e8590c";
			break;
		case "J":
			c= "#74c0fc";
			break;
		case "S":
			c= "#8ce99a";
			break;
		case "Z":
			c= "#f03e3e";
			break;
	}
	var self= this;
	var Px= this.Nx.slice();
	var Py= this.Ny.slice();
	function Pnext(){
		var maxY= Math.max.apply(null, Py);
		if(maxY+1 >= 20)
			return true;
		for(var i=0; i<4; i++)
			if(self.arr[Py[i]+1] != undefined && self.arr[Py[i]+1][Px[i]] != 0)
				return true;
		return false;
	}
	function Pdown(){
		if(Pnext()){
			for(var i=0; i<4; i++){
				self.ctx.save();
				self.ctx.fillStyle= "#fff";
				self.ctx.lineWidth= 3;
				self.ctx.strokeStyle= c;
				self.ctx.strokeRect(Px[i]*self.Bw+1.5, Py[i]*self.Bh+20+1.5, self.Bw-3, self.Bh-3);
				self.ctx.restore();
			}
			return;
		}else{
			for(var i=0; i<Py.length; i++){
				Py[i]++;
			}
		}
		Pdown();
	}
	Pdown();
	for(var i=0; i<4; i++){
		this.block(this.Nx[i], this.Ny[i], c);
	}
	if(!this.E){
		var self= this;
		requestAnimationFrame(function(){self.display();});
	}
};
Tetris.prototype.block= function(x, y, n) {
	this.ctx.save();
	this.ctx.fillStyle= n;
	this.ctx.lineWidth= 3;
	this.ctx.strokeStyle= "#000";
	this.ctx.fillRect(x*this.Bw+3, y*this.Bh+20+3, this.Bw-6, this.Bh-6);
	this.ctx.strokeRect(x*this.Bw+1.5, y*this.Bh+20+1.5, this.Bw-3, this.Bh-3);
	this.ctx.restore();
};
Tetris.prototype.preview= function(Shape, num) {
	this.ctx.save();
	this.ctx.lineWidth= 3;
	this.ctx.strokeStyle= "#000";
	var x= this.getPos(true, Shape);
	for(var i=0; i<x.length; i++)
		x[i]-=3;
	var y= this.getPos(false, Shape);

	var defaultX= 425;
	var defaultY= 85+num*70;

	var defaultBlock= 15;
	switch(Shape){
		case "I":
			c= "#364fc7";
			this.ctx.fillStyle= c;
			for(var i=0; i<4; i++){
				this.ctx.fillRect(defaultX+defaultBlock*i, defaultY, defaultBlock, defaultBlock);
				this.ctx.strokeRect(defaultX+defaultBlock*i, defaultY, defaultBlock, defaultBlock);
			}
			break;
		case "O":
			c= "#fcc419";
			this.ctx.fillStyle= c;
			for(var i=1; i<5; i++){
				if(i<3){
					this.ctx.fillRect(defaultX+defaultBlock*i, defaultY, defaultBlock, defaultBlock);
					this.ctx.strokeRect(defaultX+defaultBlock*i, defaultY, defaultBlock, defaultBlock);
				}else{
					this.ctx.fillRect(defaultX+defaultBlock*(i-2), defaultY+defaultBlock, defaultBlock, defaultBlock);
					this.ctx.strokeRect(defaultX+defaultBlock*(i-2), defaultY+defaultBlock, defaultBlock, defaultBlock);
				}
			}
			break;
		case "T":
			c= "#845ef7";
			this.ctx.fillStyle= c;
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "L":
			c= "#e8590c";
			this.ctx.fillStyle= c;
			this.ctx.fillRect(8+defaultX, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "J":
			c= "#74c0fc";
			this.ctx.fillStyle= c;
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock*2, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "S":
			c= "#8ce99a";
			this.ctx.fillStyle= c;
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock*2, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "Z":
			c= "#f03e3e";
			this.ctx.fillStyle= c;
			this.ctx.fillRect(8+defaultX, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.strokeRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
	}
	this.ctx.restore();
};
Tetris.prototype.sort= function() {
	var self= this;
	var a= ["I","O","T","L","J","S","Z"];
	var arr= [];
	function recursion (){
		var R= Math.floor(Math.random()*a.length);
		arr.push(a[R]);
		a.splice(R, 1);
		if(a.length==0){
			self.ShapeList= self.ShapeList.concat(arr);
			return;
		}
		recursion();
	}
	recursion();
};
Tetris.prototype.next= function() {
	var maxY= Math.max.apply(null, this.Ny);
	if(maxY+1 >= 20)
		return true;
	for(var i=0; i<4; i++)
		if(this.arr[this.Ny[i]+1] != undefined && this.arr[this.Ny[i]+1][this.Nx[i]] != 0)
			return true;
	return false;
};
Tetris.prototype.NextBlock= function() {
	for(var i=0; i< 4; i++){
		if(this.arr[this.Ny[i]] != undefined && this.arr[this.Ny[i]][this.Nx[i]] != undefined && this.arr[this.Ny[i]][this.Nx[i]] == 0){
			this.arr[this.Ny[i]][this.Nx[i]]= this.ShapeList[this.cnt];
		}
	}
	var scorecnt= 0;
	for (var i= 0; i < 20; i++) {
		var isFull= true;
		for(var j=0; j< 10; j++)
			if(this.arr[i][j] == 0)
				isFull= false;
		if(isFull){
			scorecnt++;
			this.arr.splice(i, 1);
			this.arr.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
	}
	if(scorecnt==4)
		scorecnt++;
	this.score+= scorecnt*1000;
	this.cnt++;
	this.T= 0;
	this.Nx= this.getPos(true, this.ShapeList[this.cnt]);
	this.Ny= this.getPos(false, this.ShapeList[this.cnt]);
	for(var i=0; i<4; i++)
		if(this.arr[this.Ny[i]] != undefined && this.arr[this.Ny[i]][this.Nx[i]] != 0)
			this.E= true;
};
Tetris.prototype.end= function() {
	console.log('end');
	clearInterval(this.down);
	window.removeEventListener("keydown", this.handleKeyDown);
};