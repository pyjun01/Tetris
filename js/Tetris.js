(function (){
	function Tetris(){
		this.canvas= document.querySelector("#canvas");
		this.ctx= this.canvas.getContext('2d');
		this.W= this.canvas.width;
		this.H= this.canvas.height;
		this.Bw= this.W/10;
		this.Bh= 40;


		var self= this;

		this.shape_name= ["I","O","T","L","J","S","Z"];
		this.shape_draw={
			I: function (x, y){
				var c= "#364fc7";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw*3, y*self.Bh+20, c);
			},
			O: function (x, y){
				var c= "#fcc419";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw, y*self.Bh+20-self.Bw, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20-self.Bw, c);
			},
			T: function (x, y){
				var c= "#845ef7";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20-self.Bh, c);
			},
			L: function (x, y){
				var c= "#e8590c";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw, y*self.Bh+20-self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20, c);
			},
			J: function (x, y){
				var c= "#74c0fc";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20-self.Bh, c);
			},
			S: function (x, y){
				var c= "#8ce99a";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20-self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20-self.Bh, c);
			},
			Z: function (x, y){
				var c= "#f03e3e";
				self.block(x*self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+20+self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+20+self.Bh, c);
			},
		};
	}
	Tetris.prototype.sort = function() {
		this.ShapeList= [];
		var self= this;
		function recursion (){
			var R= Math.floor(Math.random()*7);
			var n= 0;
			for(var i=0; i<self.ShapeList.length; i++){
				if(self.ShapeList[i] != R)
					n++;
			}
			if(n==self.ShapeList.length)
				self.ShapeList.push(R);
			if(self.ShapeList.length==7)
				return false;
			return recursion();
		}
		recursion();
	};
	Tetris.prototype.init = function (){
		function getX(){
			var arr= [];
			switch(self.shape_name[self.ShapeList[self.cnt]]){
				case "I":
					arr= [3, 4, 5, 6];
					break;
				case "O":
					arr= [3, 4];
					break;
				case "T":
					arr= [3, 4, 5];
					break;
				case "L":
					arr= [3, 4, 5];
					break;
				case "J":
					arr= [3, 4, 5];
					break;
				case "S":
					arr= [3, 4, 5];
					break;
				case "Z":
					arr= [3, 4, 5];
					break;
			}
			return arr;
		}
		function getY(){
			var arr= [];
			switch(self.shape_name[self.ShapeList[self.cnt]]){
				case "I":
					arr= [-1, -1, -1, -1];
					break;
				case "O":
					arr= [0, 0];
					break;
				case "T":
					arr= [0, 0, 0];
					break;
				case "L":
					arr= [0, 0, 0];
					break;
				case "J":
					arr= [0, 0, 0];
					break;
				case "S":
					arr= [0, 0, -1];
					break;
				case "Z":
					arr= [-1, 0, 0];
					break;
			}
			return arr;
		}
		var self= this;

		this.arr= [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		this.score= 0;
		this.ShapeList=[];
		this.sort();
		this.cnt= 0;
		this.Nx= getX();
		this.Ny= getY();

		self.display();
		self.shape_draw[self.shape_name[self.ShapeList[self.cnt]]](self.Nx[0], self.Ny[0]);

		function next(){
			var a=0;
			for(var i=0; i<self.Ny.length; i++){
				if(self.arr[self.Ny[i]+1] != undefined && self.arr[self.Ny[i]+1][self.Nx[i]] != undefined && self.arr[self.Ny[i]+1][self.Nx[i]] == 0 )
					a++;
			}
			return a!=self.Ny.length;
		}
		function addarr(){
			switch(self.shape_name[self.ShapeList[self.cnt]]){
				case "I":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					break;
				case "O":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]-1][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					break;
				case "T":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					self.arr[self.Ny[1]-1][self.Nx[1]]=self.shape_name[self.ShapeList[self.cnt]];
					break;
				case "L":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					self.arr[self.Ny[0]-1][self.Nx[0]]=self.shape_name[self.ShapeList[self.cnt]];
					break;
				case "J":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					self.arr[self.Ny[2]-1][self.Nx[2]]=self.shape_name[self.ShapeList[self.cnt]];
					break;
				case "S":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					self.arr[self.Ny[1]-1][self.Nx[1]]=self.shape_name[self.ShapeList[self.cnt]];
					break;
				case "Z":
					for(var i=0; i< self.Ny.length; i++){
						self.arr[self.Ny[i]][self.Nx[i]]=self.shape_name[self.ShapeList[self.cnt]];
					}
					self.arr[self.Ny[1]-1][self.Nx[1]]=self.shape_name[self.ShapeList[self.cnt]];
					break;
			}
			self.arr
		}
		function callback (){
			addarr();
			self.cnt++;
			if(self.cnt == self.ShapeList.length){
				self.sort();
				self.cnt=0;
			}
			self.Nx= getX();
			self.Ny= getY();
			setTimeout(function (){
				self.display();
				self.shape_draw[self.shape_name[self.ShapeList[self.cnt]]](self.Nx[0], self.Ny[0]);
				down= setInterval(_itv, 500); 
			}, 500);
		}
		function _itv (){
			for(var i=0; i<self.Ny.length; i++){
				self.Ny[i]++;
			}
			self.display();
			self.shape_draw[self.shape_name[self.ShapeList[self.cnt]]](self.Nx[0], self.Ny[0]);
			if(next()){
				clearInterval(down);
				callback();
			}
		}
		var down= setInterval(_itv, 500);
	};
	Tetris.prototype.eve = function() {
		var self= this;
		window.addEventListener("keydown", function (e){
			switch(e.keyCode){
				case 37:
					if(0<=self.x-1)
						self.x--;
					break;
				case 39:
					if(self.x+1+self.len[0]<=10)
						self.x++;
					break;
				case 40:
					if(self.y+1+self.len[1]<=20)
						self.y++;
					break;
			}
		});
	};
	Tetris.prototype.check = function() {
		for(var i=0; i<this.Nx.length; i++){
			if(this.arr[this.ny[i]+1] == undefined || this.arr[this.ny[i]+1] != 0) // reach floor
				return false;
		}
		return true;
	};
	Tetris.prototype.update = function (n){
			if(n!=0&&n%60==0){ // 1s down
				if(this.check()){ // reach floor
					this.next();
				}else{ // keep down
					this.down();
				}
				this.display();
			}

		var self= this;
		setTimeout(function (){
			self.update(++n);
		}, 1000/60);
	};
	Tetris.prototype.display = function (){
		// 10 * 20
		this.ctx.clearRect(0, 0, this.W, this.H);
		this.strokeStyle= "#333";
		this.lineWidth= 1;
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
		for(var i=0; i< this.arr.length; i++){
			for(var j=0; j< this.arr[i].length; j++){
				switch(this.arr[i][j]){
					case "I":
						var c= "#364fc7";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
					case "O":
						var c= "#fcc419";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
					case "T":
						var c= "#845ef7";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
					case "L":
						var c= "#e8590c";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
					case "J":
						var c= "#74c0fc";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
					case "S":
						var c= "#8ce99a";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
					case "Z":
						var c= "#f03e3e";
						this.block(j*this.Bw, i*this.Bh+20, c);
						break;
				}
			}
		}

		var self= this;
		// requestAnimationFrame(function(){self.display();});
	};
	Tetris.prototype.block = function(x, y, n) {
		this.ctx.save();
		this.ctx.fillStyle= n;
		this.ctx.lineWidth= 3;
		this.ctx.strokeStyle= "#000";
		this.ctx.fillRect(x+3, y+3, this.Bw-6, this.Bh-6);
		this.ctx.strokeRect(x+1.5, y+1.5, this.Bw-3, this.Bh-3);
		this.ctx.restore();
	};
	window.onload= function (){
		var tetris= new Tetris();
		tetris.init();
		// tetris.update(0);
		// tetris.display();
	}
	return Tetris;
})()