/**
 * @author Hello World
 */

(function(window) {
	
	var Bolt = function(x,y,fixed) {
		this.initialize(x,y,fixed);
	}
	
	var p = Bolt.prototype = new Container();
	
	p.shape = null;
	
	this.fixed = false;
	
	this.selected = false;
	
	p._oldX = 0.0;
	p._oldY = 0.0;
	
	p.Container_initialize = p.initialize;
	
	p.initialize = function(x,y,fixed) {
		
		this.fixed = fixed;
		
		this.x = this._oldX = x;
		this.y = this._oldY = y;
		
		this.Container_initialize();
		
		this.shape = new Shape();
		
		var g = this.shape.graphics;
		
		g.beginFill('#990000');
		g.drawCircle(0,0,10);
		g.endFill();
				
		this.addChild(this.shape);
	} 


	p.update = function () {
		
		 var tempX = this.x;
       	 var tempY = this.y;
       	 this.setX(this.x + this.getVX());
         this.setY(this.y + this.getVY());
         this._oldX = tempX;
         this._oldY = tempY;


	}
	
	p.onMouseOver = function(e) {
		this.shape.graphics.clear().beginFill('#FF00FF').drawCircle(0,0,10).endFill();
	}
	
	p.onMouseOut = function(e) {
		this.shape.graphics.clear().beginFill('#990000').drawCircle(0,0,10).endFill();
	}
	
	p.getVX = function () {
		return this.x - this._oldX;
	}
	
	p.setVX = function (value) {
		
		this._oldX = this.x - value;
	}
	
	p.getVY = function () {
		return this.y - this._oldY;
	}
	
	p.setVY = function (value) {
		this._oldY = this.y - value;
	}
	
	
	p.setX = function(value) {
		if(this.fixed) return;
		this.x = value;
	}
	
	p.getX = function() {
		return this.x;
	}
	
	
	p.setY = function(value) {
		if(this.fixed) return;
		this.y = value;
	}
	
	p.getY = function() {
		return this.y;
	}
	
	
	window.Bolt = Bolt;
	
})(window)
