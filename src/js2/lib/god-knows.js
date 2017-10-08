require(['core/game', 'core/viewport/viewport', 'core/editor/editor'], function(Game, Viewport, Editor)
{
	var test = {value: 10};

	var gameElem = $('game').first();

	var viewportElem = gameElem.find('viewport').eq(0)[0];
	var viewport = new Viewport(viewportElem);
    viewport.test();

    var editorElem = gameElem.find('editor').eq(0)[0];
    var editor = new Editor(editorElem);

    var game = new Game(viewport, editor);

	game.stat();
});


