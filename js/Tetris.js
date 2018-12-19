(function (){
	function Tetris(){
		this.canvas= document.querySelector("#canvas");
		this.ctx= this.canvas.getContext('2d');
		this.W= this.canvas.width;
		this.H= this.canvas.height;
		this.Bw= this.W/10;
		this.Bh= this.H/20;


		var self= this;

		this.shape_name= ["I","O","T","L","J","S","Z",];
		this.shape_draw={
			I: function (x, y, t){
				var c= "#364fc7";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(t? x: x*self.Bw+self.Bw, t? y*self.Bh+self.Bh: y*self.Bh, c);
				self.block(t? x: x*self.Bw+self.Bw*2, t? y*self.Bh+self.Bh*2: y*self.Bh, c);
				self.block(t? x: x*self.Bw+self.Bw*3, t? y*self.Bh+self.Bh*3: y*self.Bh, c);
			},
			O: function (x, y){
				var c= "#fcc419";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh, c);
				self.block(x*self.Bw, y*self.Bh+self.Bw, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bw, c);
			},
			T: function (x, y){
				var c= "#845ef7";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bh, c);
			},
			L: function (x, y){
				var c= "#e8590c";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh-self.Bh, c);
			},
			J: function (x, y){
				var c= "#74c0fc";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(x*self.Bw, y*self.Bh+self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+self.Bh, c);
			},
			S: function (x, y){
				var c= "#8ce99a";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh-self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh-self.Bh, c);
			},
			Z: function (x, y){
				var c= "#f03e3e";
				self.block(x*self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh, c);
				self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bh, c);
				self.block(x*self.Bw+self.Bw*2, y*self.Bh+self.Bh, c);
			},
		};
	}
	Tetris.prototype.sort = function() {
		var R= Math.floor(Math.random()*7);
		var n= 0;
		for(var i=0; i<this.ShapeList.length; i++){
			if(this.ShapeList[i] != R)
				n++;
		}
		if(n==this.ShapeList.length)
			this.ShapeList.push(R);
		if(this.ShapeList.length==7)
			return;
		this.sort();
	};
	Tetris.prototype.test = function() {
		for(var i=0; i<this.ShapeList.length; i++){
			var n= this.ShapeList[i];
			this.shape_draw[this.shape_name[n]](i, (i+1)*2);
		}
	};
	Tetris.prototype.init = function (){
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
		console.log(this.ShapeList);
		this.display();
		this.test();

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
	Tetris.prototype.update = function (){


		var self= this;
		setTimeout(function (){
			self.update();
		}, 1000/60);
	};
	Tetris.prototype.display = function (){
		// 10 * 20
		this.ctx.clearRect(0, 0, this.W, this.H);
		this.strokeStyle= "#333";
		this.lineWidth= 1;
		this.ctx.beginPath();
		for(var j=1; j<= 19; j++){
			this.ctx.moveTo(0, j*this.Bh);
			this.ctx.lineTo(this.W, j*this.Bh);
			this.ctx.stroke();
		}
		for(var i=1; i<= 9; i++){
			this.ctx.moveTo(i*this.Bw, 0);
			this.ctx.lineTo(i*this.Bw, this.H);
			this.ctx.stroke();
		}
		this.ctx.closePath();

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
		// tetris.update();
		// tetris.display();
	}
	return Tetris;
})()