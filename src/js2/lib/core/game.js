define(['core/editor/editor', 'core/viewport/viewport'], function ()
{
    function Game(viewport, editor)
    {
        this.name = 'ayy';
        this.viewport = viewport || null;
        this.editor = editor || null;

        this.updateTick = 0;
        this.renderTick = 0;
    }

    Game.prototype._update = function ()
    {
        this.updateTick++;
        this.update();
    };

    Game.prototype._render = function ()
    {
        this.renderTick++;
        this.render();
    };

    Game.prototype.update = function ()
    {
    };

    Game.prototype.render = function ()
    {
    };

    Game.prototype.tick = function ()
    {
        this._update();
        this._render();
    };

    Game.prototype.run = function ()
    {
        this.tick();
        window.requestAnimationFrame(this.run.bind(this));
    };

    return Game;
});
