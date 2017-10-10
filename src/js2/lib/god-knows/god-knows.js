define(['core/game', 'core/viewport/viewport', 'core/editor/editor', 'god-knows/levels/levels', 'core/util/bluebird'], function (Game, Viewport, Editor, levelsPromise, Promise)
{
    var gameElem = $('game').first();

    var viewportElem = gameElem.find('viewport').eq(0)[0];
    var viewport = new Viewport(viewportElem);

    var editorElem = gameElem.find('editor').eq(0)[0];
    var editor = new Editor(editorElem);

    var promise = new Promise(function (resolve)
    {
        viewport.renderResolutionGrid(10);

        levelsPromise.then(function (levels)
        {
            l(levels);

            for (var i = 0; i < levels[0].coords.length; i++)
            {
                var coords = levels[0].coords[i];
                viewport.backContext.fillRect(coords.x, coords.y, coords.w, coords.h);
            }

            var game = new Game(viewport, editor);

            resolve(game);
        });
    });

    return promise;

});
