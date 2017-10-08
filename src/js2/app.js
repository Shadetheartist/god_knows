requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js2/lib'

});

require(['god-knows/god-knows', 'core/viewport/viewport', 'core/editor/editor', 'core/viewport/texture-helper'], function(GodKnows, Viewport, Editor, TextureHelper) {

    var gameElem = $('game').first();

    var viewportElem = gameElem.find('viewport').eq(0)[0];
    var viewport = new Viewport(viewportElem);

    var editorElem = gameElem.find('editor').eq(0)[0];
    var editor = new Editor(editorElem);

    var game = new GodKnows(viewport, editor);

    game.run();
});