(function (){
	var T= 500;
	function Tetris(){
		this.canvas= document.querySelector("#canvas");
		this.ctx= this.canvas.getContext('2d');
		this.W= this.canvas.width;
		this.H= this.canvas.height;
		this.Bw= this.W/10;
		this.Bh= 40;
	}
	Tetris.prototype.sort = function() {
		var self= this;
		var a= ["I","O","T","L","J","S","Z"];
		var arr= [];
		function recursion (){
			var R= Math.floor(Math.random()*a.length);
			arr.push(a[R]);
			a.splice(R, 1);
			if(a.length==0){
				self.ShapeList= arr;
				return;
			}
			recursion();
		}
		recursion();
	};
	Tetris.prototype.getPos = function(xy) {
		var arr= [];
		if(xy){
			switch(this.ShapeList[this.cnt]){
				case "I":
					arr= [3, 4, 5, 6];
					break;
				case "O":
					arr= [3, 4, 3, 4];
					break;
				case "T":
					arr= [4, 3, 4, 5];
					break;
				case "L":
					arr= [3, 3, 4, 5];
					break;
				case "J":
					arr= [5, 3, 4, 5];
					break;
				case "S":
					arr= [4, 5, 3, 4];
					break;
				case "Z":
					arr= [3, 4, 4, 5];
					break;
			}
		}else{
			switch(this.ShapeList[this.cnt]){
				case "I":
					arr= [-1, -1, -1, -1];
					break;
				case "O":
					arr= [-1, -1, 0, 0];
					break;
				case "T":
					arr= [-1, 0, 0, 0];
					break;
				case "L":
					arr= [-1, 0, 0, 0];
					break;
				case "J":
					arr= [-1, 0, 0, 0];
					break;
				case "S":
					arr= [-1, -1, 0, 0];
					break;
				case "Z":
					arr= [-1, -1, 0, 0];
					break;
			}
		}
		return arr;
	};
	Tetris.prototype.next = function() {
		var len= this.arr.length;
		var minX= Math.min.apply(null, this.Nx);
		var maxX= Math.max.apply(null, this.Nx);
		var maxY= Math.max.apply(null, this.Ny);
		if(maxY+1 >= 20)
			return true;
		for(var j=0; j<len; j++){
			if(minX <= this.arr[j][0] && this.arr[j][0] <= maxX && this.arr[j][1] - maxY < 3){
				for(var i=0; i<this.Nx.length; i++){
					if(this.Nx[i] == this.arr[j][0] && this.Ny[i]+1 == this.arr[j][1])
						return true;
				}
			}
		}
		return false;
	};
	Tetris.prototype.block = function(x, y, n) {
		this.ctx.save();
		this.ctx.fillStyle= n;
		this.ctx.lineWidth= 3;
		this.ctx.strokeStyle= "#000";
		this.ctx.fillRect(x*this.Bw+3, y*this.Bh+20+3, this.Bw-6, this.Bh-6);
		this.ctx.strokeRect(x*this.Bw+1.5, y*this.Bh+20+1.5, this.Bw-3, this.Bh-3);
		this.ctx.restore();
	};
	Tetris.prototype.NextBlock = function() {
		for(var i=0; i< this.Nx.length; i++)
			this.arr.push([this.Nx[i], this.Ny[i], this.ShapeList[this.cnt]]);
		
		if(this.arr.length > 10){
			var a=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var len= this.arr.length;
			var isFull= false
			var FullNum= [];
			for(var i=0; i<len; i++)
				a[this.arr[i][1]]++;
			for(var i=0; i<20; i++){
				if(a[i] == 10){
					isFull= true;
					FullNum.push(i);
				}
			}
			if(isFull){
				var Nlen= FullNum.length;
				this.arr= this.arr.filter(function (v){
					return a[v[1]] != 10;
				});
				for(var i=0; i< len; i++){
					for(var j=0; j< Nlen; j++){
						if(this.arr[i][1] < FullNum[j])
							this.arr[i][1]++;
					}
				}
			}
		}
		this.cnt++;
		this.T= 0;
		if(this.cnt == this.ShapeList.length){
			this.sort();
			this.cnt=0;
		}
		this.Nx= this.getPos(true);
		this.Ny= this.getPos(false);
	};
	Tetris.prototype.init = function (){
		this.strokeStyle= "#333";
		this.lineWidth= 1;
		this.arr=[];
		this.score= 0;
		this.cnt= 0;
		this.T= 0;
		this.sort();
		this.Nx= this.getPos(true);
		this.Ny= this.getPos(false);	
		this.eve();
	};
	Tetris.prototype.eve = function() {
		var self= this;
		window.addEventListener("keydown", function (e){
			switch(e.keyCode){
				// space, turn
				case 32:
					break;
				case 38:
					var Ix= [];
					var Iy= [];
					switch(self.ShapeList[self.cnt]){
						case "I":
							switch(self.T){
								/*
									x= x[0]+2
									y= y[0]-2 + x[i]-x[0]

									x= x[0]-2 + y[i]-y[0]
									y= y[0]+2

									x= x[0]+1
									y= y[0]-2 + x[i]-x[0]

									x= x[0]-1 + y[i]-y[0]
									y= y[0]+2

								*/
								case 0:
									var Ay= self.Ny[0]+1>19? -3: -2;
									for(var i=0; i<self.Nx.length; i++){
										Ix.push(self.Nx[0]+2);
										Iy.push( (self.Nx[i]-self.Nx[0]) + self.Ny[0]+Ay);
									}
									break;
								case 1:
									// var Ax= self.Nx[0]-2<0? 
									for(var i=0; i<self.Nx.length; i++){
										Ix.push( (self.Ny[i]-self.Ny[0]) + self.Nx[0]-2);
										Iy.push(self.Ny[0]+2);
									}
									break;
								case 2:
									// var m= (self.Nx[3]-2<=19? -2: -3;
									for(var i=0; i<self.Nx.length; i++){
										Ix.push(self.Nx[0]+1);
										Iy.push( (self.Nx[i]-self.Nx[0]) + self.Ny[0]-2);
									}
									break;
								case 3:
									var m= self.Nx[0]-1<0? 0: -1;
									for(var i=0; i<self.Nx.length; i++){
										Ix.push( (self.Ny[i]-self.Ny[0]) + self.Nx[0]-1);
										Iy.push(self.Ny[0]+2);
									}
									break;
							}
							self.Nx= Ix;
							self.Ny= Iy;
							break;
					}
					self.T++;
					if(self.T>3)
						self.T=0;
					break;
				case 37:
					var Min= Math.min.apply(null, self.Nx);
					if(Min==0)
						return false;
					for(var i=0; i<self.arr.length; i++){
						if(self.arr[i][0] == Min-1){
							for(var j=0; j<self.Nx.length; j++){
								if(self.arr[i][0] == self.Nx[j]-1 && self.arr[i][1] == self.Ny[j]){
									return false;
								}
							}
						}
					}
					for(var i=0; i<self.Nx.length; i++)
						self.Nx[i]--;
					self.display();
					break;
				case 39:
					var Max= Math.max.apply(null, self.Nx);
					if(Max==9)
							return false;
					for(var i=0; i<self.arr.length; i++){
						if(self.arr[i][0] == Max+1){
							for(var j=0; j<self.Nx.length; j++){
								if(self.arr[i][0] == self.Nx[j]+1 && self.arr[i][1] == self.Ny[j]){
									return false;
								}
							}
						}
					}
					for(var i=0; i<self.Nx.length; i++)
						self.Nx[i]++;
					self.display();
					break;
				case 40:
					if(self.next()){
						self.NextBlock();
					}else{
						for(var i=0; i<self.Ny.length; i++)
							self.Ny[i]++;
					}
					self.display();
					break;
			}
		});
	};
	Tetris.prototype.update = function (){
		if(this.next()){
			this.NextBlock();
		}else{
			for(var i=0; i<this.Ny.length; i++)
				this.Ny[i]++;
		}

		var self= this;
		setTimeout(function (){
			self.update();
		}, 800);
	};
	Tetris.prototype.display = function (){
		this.ctx.clearRect(0, 0, this.W, this.H);
		this.ctx.beginPath();
		for(var j=0; j<= 19; j++){
			this.ctx.moveTo(0, j*this.Bh+20);
			this.ctx.lineTo(this.W, j*this.Bh+20);
			this.ctx.stroke();
		}
		for(var i=1; i<= 9; i++){
			this.ctx.moveTo(i*this.Bw, 0);
			this.ctx.lineTo(i*this.Bw, this.H);
			this.ctx.stroke();
		}
		this.ctx.closePath();
		var c="";
		for(var i=0; i< this.arr.length; i++){
			switch(this.arr[i][2]){
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
			this.block(this.arr[i][0], this.arr[i][1], c);
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
		this.block(this.Nx[0], this.Ny[0], c);
		this.block(this.Nx[1], this.Ny[1], c);
		this.block(this.Nx[2], this.Ny[2], c);
		this.block(this.Nx[3], this.Ny[3], c);
		var self= this;
		requestAnimationFrame(function(){self.display();});
	};
	window.onload= function (){
		var tetris= new Tetris();
		tetris.init();
		tetris.update();
		tetris.display();
	}
})()