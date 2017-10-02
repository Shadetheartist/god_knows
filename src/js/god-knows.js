var testArea = TestArea();

testArea.start();

function TestArea()
{
    var bounds = {x: 0, y: 0, w: 1000, h: 400};

    var game = new Game(document.getElementById('gameCanvas'), bounds);

    game.player = new Player();
    game.env = new Environment(bounds);
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