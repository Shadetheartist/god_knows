define(['core/game', 'core/viewport/viewport', 'core/editor/editor', 'core/viewport/texture-helper'], function (Game, Viewport, Editor, TextureHelper)
{
    function GodKnows(viewport, editor)
    {
        Game.apply(this, arguments);
        this.x = 0;
    }

    GodKnows.prototype = Game.prototype;
    GodKnows.prototype.constructor = GodKnows.constructor;
    GodKnows.prototype.update = function ()
    {

    };


    return GodKnows;
});


