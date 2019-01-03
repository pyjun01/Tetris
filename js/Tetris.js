function Tetris(){
	this.canvas= document.querySelector("#canvas");
	this.ctx= this.canvas.getContext('2d');
	this.W= this.canvas.width;
	this.H= this.canvas.height;
	this.Bw= 40;
	this.Bh= 40;

	var self= this;
	this.press= false;
	this.arrow= null;
	this.handleKeyDown= function (e){
		switch(e.keyCode){
			case 32:
				clearInterval(self.down);
				function down(n){
					if(self.next()){
						self.NextBlock();
						self.score+= n*2;
						return;
					}else{
						for(var i=0; i<self.Ny.length; i++)
							self.Ny[i]++;
					}
					if(self.E){
						self.end();
					}
					down(++n);
				}
				down(0);
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
				if(!self.press){
					clearInterval(self.down);
					if(self.next()){
						self.NextBlock();
					}else{
						for(var i=0; i<self.Ny.length; i++)
							self.Ny[i]++;
					}
					self.score++;
					if(self.E)
						self.end();
					self.arrow= setInterval(function (){
						if(self.press){
							if(self.next()){
								self.NextBlock()
							}else{
								for(var i=0; i<self.Ny.length; i++)
									self.Ny[i]++;
							}
							self.score++;
							if(self.E)
								self.end();
						}
					}, 100);
					self.press= true;
				}
				break;
		}
	}
	this.handleKeyUp= function (e){
		if(e.keyCode == 40 && self.press){
			clearInterval(self.down);
			self.down= setInterval(function(){self.update()}, 1000);
			self.press= false;
			clearInterval(self.arrow);
		}
	}
}
Tetris.prototype.init= function (){
	this.P= new Path2D();
	var Bw= 25;
	var w= 150;
	var h= 50;
	var l= (this.W-w)/2;
	var t= (this.H-h)/2;
	this.P.moveTo(l+Bw, t);
	this.P.bezierCurveTo(l, t, l, t+h, l+Bw, t+h);
	this.P.lineTo(l+w-Bw, t+h)
	this.P.bezierCurveTo(l+w, t+h, l+w, t, l+w-Bw, t);
	this.P.closePath();
	this.G= this.ctx.createLinearGradient(0, 0, this.W, 0);
	this.G.addColorStop(0, "#12c2e9");
	this.G.addColorStop(0.5, "#c471ed");
	this.G.addColorStop(1, "#f64f59");

	this.ctx.fillStyle= this.G;
	this.ctx.strokeStyle= this.G;
	this.ctx.lineWidth= 2;
	this.ctx.strokeRect(1, 1, 498, 818);
	this.btn("START", this.G);
	var self= this;
	this.canvas.onmousemove= function (e){
		this.style.cursor= "unset";
		var rect= this.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		if(self.ctx.isPointInPath(self.P, x, y))
			this.style.cursor= "pointer";
	}
	this.canvas.onclick= function (e){
		var rect= this.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		if(self.ctx.isPointInPath(self.P, x, y)){
			self.play();
		}
	}
};
Tetris.prototype.play = function (){
	clearInterval(this.down);
	this.canvas.onmousemove= function (){}
	this.canvas.onclick= function (){}
	this.canvas.style.cursor= "unset";
	this.arr= [];
	for(var i=0; i<21; i++)
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
	window.addEventListener("keyup", this.handleKeyUp);
	var self= this;
	this.down= setInterval(function(){self.update()}, 1000);
	this.display();
};
Tetris.prototype.getPos= function(xy, tg) {
	switch(tg){
		case "I":
			return xy? [3, 4, 5, 6]: [0, 0, 0, 0];
		case "O":
			return xy? [3, 4, 3, 4]: [0, 0, 1, 1];
		case "T":
			return xy? [4, 3, 4, 5]: [1, 1, 0, 1];
		case "L":
			return xy? [4, 3, 3, 5]: [1, 0, 1, 1];
		case "J":
			return xy? [4, 5, 3, 5]: [1, 0, 1, 1];
		case "S":
			return xy? [4, 4, 5, 3]: [0, 1, 0, 1];
		case "Z":
			return xy? [4, 3, 4, 5]: [0, 0, 1, 1];
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
	var self= this;

	this.ctx.clearRect(0, 0, this.W, this.H);

	function board (End){
		self.ctx.beginPath();
		for(var j=0; j<= 20; j++){
			self.ctx.moveTo(0, j*self.Bh+20);
			self.ctx.lineTo(400, j*self.Bh+20);
			self.ctx.stroke();
		}
		for(var i=0; i<= 10; i++){
			self.ctx.moveTo(i*self.Bw, 0);
			self.ctx.lineTo(i*self.Bw, self.H);
			self.ctx.stroke();
		}
		self.ctx.closePath();
	}
	function preview (End){
		self.ctx.beginPath();
		self.ctx.moveTo(420, 70);
		self.ctx.lineTo(420, 280);
		self.ctx.lineTo(490, 280);
		self.ctx.lineTo(490, 70);
		self.ctx.lineTo(420, 70);
		self.ctx.moveTo(420, 140);
		self.ctx.lineTo(490, 140);
		self.ctx.moveTo(420, 210);
		self.ctx.lineTo(490, 210);
		self.ctx.stroke();
		self.ctx.closePath();
		self.ctx.font= "100 23px Arial";
		self.ctx.fillText("NEXT", 425, 50);
		for(var i= 1; i<4; i++)
			self.preview(self.ShapeList[self.cnt+i], i-1);
	}
	function score (End){
		self.ctx.font= "100 20px Arial";
		self.ctx.fillText("SCORE", 420, 330);
		self.ctx.save();
		self.ctx.textAlign = "center"; 
		self.ctx.fillText(self.score, 455, 360);
		self.ctx.restore();
	}
	board();
	preview();
	score();
	var c="";
	for(var i=0; i< 21; i++){
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
	var Px= this.Nx.slice();
	var Py= this.Ny.slice();
	function Pnext(){
		var maxY= Math.max.apply(null, Py);
		if(maxY+1 >= self.arr.length)
			return true;
		for(var i=0; i<4; i++)
			if(self.arr[Py[i]+1] != undefined && self.arr[Py[i]+1][Px[i]] != 0)
				return true;
		return false;
	}
	function Pdown(){
		if(Pnext()){
			self.ctx.save();
			self.ctx.fillStyle= "#fff";
			self.ctx.lineWidth= 3;
			self.ctx.strokeStyle= c;
			for(var i=0; i<4; i++){
				var isDouble= false;
				for(var j=0; j<4; j++){
					if( Px[i] == self.Nx[j] && Py[i] == self.Ny[j]){
						isDouble= true;
						break;
					}
				}
				if(!isDouble)
					self.ctx.strokeRect(Px[i]*self.Bw+1.5, Py[i]*self.Bh-20+1.5, self.Bw-3, self.Bh-3);
			}
			self.ctx.restore();
			return;
		}else{
			for(var i=0; i<Py.length; i++){
				Py[i]++;
			}
		}
		Pdown();
	}
	if(!this.E){
		Pdown();
		for(var i=0; i<4; i++){
			this.block(this.Nx[i], this.Ny[i], c);
		}
		var self= this;
		requestAnimationFrame(function(){self.display();});
	}else{
		self.ctx.strokeStyle= "#000";
		self.ctx.fillStyle= "#000";
		board();
		preview();
		score();
		self.ctx.beginPath();
		for(var i=0; i< 21; i++){
			for(var j=0; j< 10; j++){
				if(self.arr[i][j] != 0){
					c= "#666";
					self.block(j, i, c);
				}
			}
		}
		this.ctx.fillStyle= 'rgba(0, 0, 0, 0.5)';
		this.ctx.fillRect(0, 0, this.W, this.H);
		this.btn("RE", "#000");
		this.canvas.onmousemove= function (e){
			this.style.cursor= "unset";
			var rect= this.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			if(self.ctx.isPointInPath(self.P, x, y))
				this.style.cursor= "pointer";
		}
		this.canvas.onclick= function (e){
			var rect= this.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			if(self.ctx.isPointInPath(self.P, x, y)){
				self.ctx.fillStyle= self.G;
				self.ctx.strokeStyle= self.G;
				self.play();
			}
		}	
	}
};
Tetris.prototype.block= function(x, y, n) {
	this.ctx.save();
	this.ctx.fillStyle= n;
	this.ctx.lineWidth= 3;
	var b= 1;
	this.ctx.fillRect(x*this.Bw+b, y*this.Bh-20+b, this.Bw-b*2, this.Bh-b*2);
	this.ctx.restore();
};
Tetris.prototype.preview= function(Shape, num) {
	this.ctx.save();
	this.ctx.lineWidth= 3;
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
			this.ctx.fillStyle= this.E? "#666": c;
			for(var i=0; i<4; i++)
				this.ctx.fillRect(defaultX+defaultBlock*i, defaultY, defaultBlock, defaultBlock);
			break;
		case "O":
			c= "#fcc419";
			this.ctx.fillStyle= this.E? "#666": c;
			for(var i=1; i<5; i++){
				if(i<3){
					this.ctx.fillRect(defaultX+defaultBlock*i, defaultY, defaultBlock, defaultBlock);
				}else{
					this.ctx.fillRect(defaultX+defaultBlock*(i-2), defaultY+defaultBlock, defaultBlock, defaultBlock);
				}
			}
			break;
		case "T":
			c= "#845ef7";
			this.ctx.fillStyle= this.E? "#666": c;
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "L":
			c= "#e8590c";
			this.ctx.fillStyle= this.E? "#666": c;
			this.ctx.fillRect(8+defaultX, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "J":
			c= "#74c0fc";
			this.ctx.fillStyle= this.E? "#666": c;
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "S":
			c= "#8ce99a";
			this.ctx.fillStyle= this.E? "#666": c;
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			break;
		case "Z":
			c= "#f03e3e";
			this.ctx.fillStyle= this.E? "#666": c;
			this.ctx.fillRect(8+defaultX, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY-defaultBlock, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock, 15+defaultY, defaultBlock, defaultBlock);
			this.ctx.fillRect(8+defaultX+defaultBlock*2, 15+defaultY, defaultBlock, defaultBlock);
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
	if(maxY+1 >= this.arr.length)
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
	for (var i= 0; i < this.arr.length; i++) {
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
	if(this.ShapeList.length-7<=this.cnt)
		this.sort();
	this.T= 0;
	this.Nx= this.getPos(true, this.ShapeList[this.cnt]);
	this.Ny= this.getPos(false, this.ShapeList[this.cnt]);
	for(var i=0; i<4; i++)
		if(this.arr[this.Ny[i]] != undefined && this.arr[this.Ny[i]][this.Nx[i]] != 0)
			this.E= true;
};
Tetris.prototype.end= function() {
	clearInterval(this.down);
	clearInterval(this.arrow);
	window.removeEventListener("keydown", this.handleKeyDown);
	window.removeEventListener("keydown", this.handleKeyUp);
	var self= this;
};
Tetris.prototype.btn= function (text, fill){
	var w= 150;
	var h= 50;
	var l= (this.W-w)/2;
	var t= (this.H-h)/2;
	this.ctx.save();
	this.ctx.lineWidth= 2;
	this.ctx.fillStyle = fill;
	this.ctx.fill(this.P);
	this.ctx.font = '30px sans-serif';
	this.ctx.textAlign = "center"; 
	this.ctx.fillStyle = 'white';
	this.ctx.fillText(text, l+w/2, t+36);
	this.ctx.restore();
}