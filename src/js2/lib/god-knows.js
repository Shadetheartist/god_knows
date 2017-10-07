require(['core/game', 'core/viewport/viewport'], function(Game, Viewport)
{
	var gameElem = $('game').first();

	var viewport = gameElem.find('viewport').eq(0)[0];

	var viewPort = new Viewport(viewport);

	viewPort.renderResolutionGrid();
	viewPort.test();

	var game = new Game(viewPort);

	game.stat();
});


