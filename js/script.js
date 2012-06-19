/* Author: Patrick Wolleb
*/

(function(){
	
	
	
	$('#start_btn').click(function(){
		$('header').hide('slow'); 
	});
	
	
	
	var points = [];
	var sticks = [];
	
	var selectedPoint = null;
	
	var canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 800;	
	
	
	var stage = new Stage(canvas);
	
	console.log();
	
	stage.enableMouseOver(30);
	
	var bg = new Shape();
	bg.graphics.beginFill('#999')
				.drawRect(0,0,canvas.width, canvas.height)
				.beginFill(null);
	stage.addChild(bg);
	
	// Create a new Text object:
	
	// add the text as a child of the stage. This means it will be drawn any time the stage is updated
	// and that it's transformations will be relative to the stage coordinates:
	
	var scaffoldHeight = 0.0;
	

	
	
	var scaffold = new Container();	
	scaffold.y = 300;
	stage.addChild(scaffold);
	
	
	var baseline = new Shape();
	baseline.graphics.setStrokeStyle(1).moveTo(0,0)
	.beginStroke(Graphics.getRGB(0,0,0)).lineTo(600,0)
	//.beginFill('#000066').drawRect(0,0,100,100);
	scaffold.addChild(baseline);
	
	
	
	var p2 = new Bolt(200,0, true);
	points.push(p2);
	p2.onPress = onPointSelected;
	
	var p3 = new Bolt(400,0, true);
	points.push(p3);
	p3.onPress = onPointSelected;
	
	
	scaffold.addChild(p2, p3);
	// position the text on screen, relative to the stage coordinates:
	//p1.update();
	//p2.update();
	
		//stage.update();
	// call update on the stage to make it render the current display list to the canvas:
	
	
	Ticker.addListener(window);
	Ticker.useRAF = true;
	Ticker.setFPS(30);
	
	function onPointSelected(e) {
		
		bg.onPress = createStick;
		if(selectedPoint && selectedPoint != e.target) {
			createStick(e.target);
			return;
		}
		selectedPoint = e.target;
		selectedPoint.setSelected(true);
		
		

	}
	
	function gameOver() {
		$('#gameOver').css('display', 'block');
		console.log('game over');
	}
	
	function createStick(e) {
		var point;
		if(e instanceof Bolt) {
			point = e;
		}else {
			point = new Bolt(e.stageX, e.stageY - scaffold.y);
			point.onPress = onPointSelected;				
			scaffold.addChild(point);
		}
		var s = new Stick(point, selectedPoint, null, gameOver);
		scaffold.addChildAt(s,0); 
		
		var i = points.length;
		var insert = true;
		while( --i > -1 ) {
			if(points[i] === point) {
				insert = false;
			}
			points[i].setSelected(false);
			if(points[i].y < scaffoldHeight) scaffoldHeight = points[i].y;
		}
		if(insert) points.push(point);
		sticks.push(s);
		selectedPoint = null;
		delete bg.onPress;
		
		console.log("SCAFFOLD HEIGHT " + scaffoldHeight);
		var pX = scaffold.localToGlobal(0, scaffoldHeight);
		console.log(pX);
	}
	
	window.tick = function () {
		
		var i = points.length;
		while( --i > -1 ) {
			points[i].setY(points[i].y + 1);
			points[i].update();
		}
		
		var j = 1;
		while( --j > -1) {
			i = sticks.length;
			while( --i > -1 ) sticks[i].update();			
		}
		
		
		var pX = scaffold.localToGlobal(0, scaffoldHeight);
		if(pX.y < 150) {
			scaffold.y++;
		}
	
		
		stage.update();
	}
	
})();




