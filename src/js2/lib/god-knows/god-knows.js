define(['core/game', 'core/viewport/viewport', 'core/editor/editor', 'god-knows/levels/levels', 'core/util/bluebird', 'core/viewport/texture-helper'], function (Game, Viewport, Editor, levelsPromise, Promise, TextureHelper)
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

            var game = new Game(viewport, editor);
            game.viewport.backContext.translate(800, -1000);


            game.update = function ()
            {
                game.viewport.backContext.translate(-1, 0);
            };

            game.render = function ()
            {
                this.viewport.backContext.clearRect(0, 0, 5000, 5000);
                for (var i = 0; i < levels[0].coords.length; i++)
                {
                    var coords = levels[0].coords[i];
                    TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, coords, 10, {x: 0.5, y: 1});
                    TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, coords, 10, {x: -0.5, y: 1});
                    TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, coords, 10);
                    TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, coords, 10);
                    //this.viewport.backContext.strokeRect(coords.x, coords.y, coords.w, coords.h);
                }
            };
            resolve(game);
        });
    });

    return promise;

});
