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
        var rect = {x: 0, y: 0, w: 100, h: 100};
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect);

        rect.x += rect.w;
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect);
    };


    return GodKnows;
});


