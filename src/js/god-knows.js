var testArea = TestArea();

testArea.start();

function TestArea ()
{
	var bounds = {x: 0, y: 0, w: 1000, h: 400};

	var game = new Game(document.getElementById('game-canvas'), bounds);

	game.player     = new Player();
	game.env        = new Environment(bounds);
	game.ctx.camera = new Camera(bounds);

	game.boxes.push(new Box(50, 350, 50, 50));
	game.boxes.push(new Box(100, 300, 100, 100));

	game.boxes.push(new Box(200, 225, 50, 50));

	game.boxes.push(new Box(350, 350, 50, 50));
	game.boxes.push(new Box(400, 300, 100, 100));
	game.boxes.push(new Box(500, 300, 100, 100));
	game.boxes.push(new Box(450, 200, 50, 50));
	game.boxes.push(new Box(450, 250, 50, 50));
	game.boxes.push(new Box(500, 250, 50, 50));

	game.boxes.push(new Box(600, 200, 50, 50));
	game.boxes.push(new Box(700, 200, 50, 50));
	game.boxes.push(new Box(700, 350, 50, 50));
	game.boxes.push(new Box(800, 200, 50, 50));
	game.boxes.push(new Box(900, 200, 50, 50));

	return game;
}

var playerAccelBez = new Bezier(0, 200, 150, 150, 200, 0);

$(document).ready(function()
{
	var bezElem = $("#accel-bez")[0];
	console.log(bezElem);
	var bezCtx  = bezElem.getContext("2d");

	playerAccelBez.handleInteraction(bezElem);

	function renderBez ()
	{
		bezCtx.clearRect(0, 0, 200, 200);

		playerAccelBez.drawSkeleton(bezCtx);
		playerAccelBez.drawCurve(bezCtx);
		playerAccelBez.drawPoints(bezCtx);
		playerAccelBez.drawPoint(bezCtx, playerAccelBez.get(Math.abs(testArea.player.accel.x) / testArea.player.maxSpeed));

		window.requestAnimationFrame(renderBez);
	}

	renderBez();
});
