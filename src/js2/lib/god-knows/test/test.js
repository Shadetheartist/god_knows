require(['god-knows/god-knows'], function(GodKnows) {

    var gameElem = $('game').first();

    var viewportElem = gameElem.find('viewport').eq(0)[0];
    var viewport = new Viewport(viewportElem);

    var editorElem = gameElem.find('editor').eq(0)[0];
    var editor = new Editor(editorElem);

    var game = new GodKnows(viewport, editor);

    game.run();
});