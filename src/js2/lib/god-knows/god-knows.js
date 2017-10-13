define(['core/game', 'core/viewport/viewport', 'core/editor/editor', 'god-knows/levels/levels', 'core/util/bluebird', 'core/viewport/texture-helper'], function (Game, Viewport, Editor, levelsPromise, Promise, TextureHelper)
{
    var gameElem = $('game').first();

    var viewportElem = gameElem.find('viewport').eq(0)[0];
    var viewport = new Viewport(viewportElem);

    var editorElem = gameElem.find('editor').eq(0)[0];
    var editor = new Editor(editorElem);

    var promise = new Promise(function (resolve)
    {
        //viewport.renderResolutionGrid(10);

        levelsPromise.then(function (levels)
        {
            l(levels);

            var game = new Game(viewport, editor);
            game.viewport.backContext.translate(0, -1000);


            game.update = function ()
            {
                game.viewport.backContext.translate(-1, 0);
            };

            game.render = function ()
            {
                this.viewport.backContext.clearRect(0, 0, 5000, 5000);
                this.viewport.backContext.drawImage(levels[0].backGround.canvas, 0, 0);
            };

            resolve(game);
        });
    });

    return promise;

});
