define(['core/game', 'core/viewport/viewport', 'core/editor/editor', 'core/viewport/texture-helper', 'god-knows/levels/levels'], function (Game, Viewport, Editor, TextureHelper, LevelLoader, levels)
{
    function GodKnows(viewport, editor, scenes)
    {
        Game.apply(this, arguments);
    }

    GodKnows.prototype = Game.prototype;
    GodKnows.prototype.constructor = GodKnows.constructor;

    return GodKnows;
});


