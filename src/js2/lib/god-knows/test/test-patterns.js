define(['core/game', 'core/viewport/viewport', 'core/editor/editor', 'core/viewport/texture-helper'], function (Game, Viewport, Editor, TextureHelper)
{
    function TestPatterns(viewport)
    {
        this.viewport = viewport;
        this.x = 0;
        this.blit();
    }

    TestPatterns.prototype.blit = function ()
    {
        var spacing = 5;
        var bounds = this.viewport.config.resolution;
        var rect = {x: 0, y: 0, w: bounds.w / 6 - (spacing), h: bounds.h / 6 - (spacing)};

        TextureHelper.Rectangle.dots(this.viewport.backContext, rect, 20);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect, 10);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect, 5);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.dots(this.viewport.backContext, rect, 1);

        this.viewport.backContext.lineWidth = 1;

        rect.x = 0;
        rect.y += rect.h + spacing;
        TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, rect, 20);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, rect, 10);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, rect, 5);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.horizontal(this.viewport.backContext, rect, 1);

        rect.x = 0;
        rect.y += rect.h + spacing;
        TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, rect, 20);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, rect, 10);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, rect, 5);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.vertical(this.viewport.backContext, rect, 1);

        rect.x = 0;
        rect.y += rect.h + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 20);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 10);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 5);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 2);

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 1);

        rect.x = 0;
        rect.y += rect.h + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 20, {x: -1, y: 1});

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 10, {x: -1, y: 1});

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 5, {x: -1, y: 1});

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 2, {x: -1, y: 1});

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 2, {x: -1, y: 1});

        rect.x += rect.w + spacing;
        TextureHelper.Rectangle.Lines.diagonal(this.viewport.backContext, rect, 1, {x: -1, y: 1});

    };


    return TestPatterns;
});


