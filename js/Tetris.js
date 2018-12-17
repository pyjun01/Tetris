(function (){
	function Tetris(){
		this.canvas= document.querySelector("#canvas");
		this.ctx= this.canvas.getContext('2d');
		this.W= this.canvas.width;
		this.H= this.canvas.height;
		this.Bw= this.W/10;
		this.Bh= this.H/20;
		this.C= ["#364fc7", "#fcc419", "#845ef7", "#e8590c", "#74c0fc", "#8ce99a", "#f03e3e"];
	}
	Tetris.prototype.init = function(option) {
		this.bg();
		this.t();
		this.eve();
	};
	Tetris.prototype.bg = function() {
		// 10 * 20
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
	};
	Tetris.prototype.block = function(x, y, n) {
		this.ctx.save();
		this.ctx.fillStyle= this.C[n];
		this.ctx.lineWidth= 3;
		this.ctx.strokeStyle= "#000";
		this.ctx.fillRect(x+3, y+3, this.Bw-6, this.Bh-6);
		this.ctx.strokeRect(x+1.5, y+1.5, this.Bw-3, this.Bh-3);
		this.ctx.restore();
	};
	Tetris.prototype.t = function() {
		/*
		I, O, T, L, J, S, Z
		*/
		var self= this;
		function I(x, y, t){
			self.block(x*self.Bw, y*self.Bh, 0);
			self.block(t? x: x*self.Bw+self.Bw, t? y*self.Bh+self.Bh: y*self.Bh, 0);
			self.block(t? x: x*self.Bw+self.Bw*2, t? y*self.Bh+self.Bh*2: y*self.Bh, 0);
			self.block(t? x: x*self.Bw+self.Bw*3, t? y*self.Bh+self.Bh*3: y*self.Bh, 0);
		}
		I(0, 13, true);
		I(0, 19, false);

		function O(x, y){
			self.block(x*self.Bw, y*self.Bh, 1);
			self.block(x*self.Bw+self.Bw, y*self.Bh, 1);
			self.block(x*self.Bw, y*self.Bh+self.Bw, 1);
			self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bw, 1);
		}
		O(0, 17);

		function T(x, y){
			self.block(x*self.Bw, y*self.Bh, 2);
			self.block(x*self.Bw+self.Bw, y*self.Bh, 2);
			self.block(x*self.Bw+self.Bw*2, y*self.Bh, 2);
			self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bh, 2);
		}
		T(0, 0);

		function L(x, y){
			self.block(x*self.Bw, y*self.Bh, 3);
			self.block(x*self.Bw+self.Bw, y*self.Bh, 3);
			self.block(x*self.Bw+self.Bw*2, y*self.Bh, 3);
			self.block(x*self.Bw+self.Bw*2, y*self.Bh-self.Bh, 3);
		}
		L(3, 1)

		function J(x, y){
			self.block(x*self.Bw, y*self.Bh, 4);
			self.block(x*self.Bw, y*self.Bh+self.Bh, 4);
			self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bh, 4);
			self.block(x*self.Bw+self.Bw*2, y*self.Bh+self.Bh, 4);
		}
		J(5, 5)
		
		function S(x, y){
			self.block(x*self.Bw, y*self.Bh, 5);
			self.block(x*self.Bw+self.Bw, y*self.Bh, 5);
			self.block(x*self.Bw+self.Bw, y*self.Bh-self.Bh, 5);
			self.block(x*self.Bw+self.Bw*2, y*self.Bh-self.Bh, 5);
		}
		S(0, 5)

		function Z(x, y){
			self.block(x*self.Bw, y*self.Bh, 6);
			self.block(x*self.Bw+self.Bw, y*self.Bh, 6);
			self.block(x*self.Bw+self.Bw, y*self.Bh+self.Bh, 6);
			self.block(x*self.Bw+self.Bw*2, y*self.Bh+self.Bh, 6);
		}
		Z(3, 8)

	};
	Tetris.prototype.eve = function() {
		

	};

	window.onload= function (){
		var T= new Tetris();
		T.init();
	}
})()