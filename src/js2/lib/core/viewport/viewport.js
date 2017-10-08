define(['core/viewport/texture-helper'], function (TextureHelper)
{
    function Viewport(elem, config)
    {
        this.config = config || Viewport.defaultConfig;
        this.canvas = [];
        this.contexts = [];
        this.elem = elem;

        for (var i = 0; i < Math.min(this.config.layers, 2); i++)
        {
            var canvas = Viewport.createCanvas(elem, this.config.resolution);
            canvas = $(elem).find("canvas").eq(i)[0];
            this.contexts.push(canvas.getContext('2d'));
        }

        this.frontContext = this.contexts[0];
        this.backContext = this.contexts[this.contexts.length];

    }

    Viewport.prototype.render = function ()
    {
        for (var i = 0; i < config.layers; i++)
        {
            this.layers.push(this.canvas.getContext('2d'));
        }
    };

    Viewport.prototype.test = function ()
    {
        var ctx0 = this.contexts[0];
        var ctx1 = this.contexts[1];
        var ctx2 = this.contexts[2];


        var rect = {x: 0, y: 0, w: 500, h: 500};


        ctx1.strokeStyle = "rgba(0,0,255, 1)";
        ctx1.strokeRect(rect.x, rect.y, rect.w, rect.h);

        ctx0.strokeStyle = "rgba(0,0,0, 1)";
        ctx0.strokeRect(rect.x, rect.y, rect.w, rect.h);



        ctx0.strokeStyle = "rgba(0,0,0, 0.1)";

        TextureHelper.Rectangle.dots(ctx0, rect, 10);
        TextureHelper.Rectangle.Lines.vertical(ctx0, rect, 50);
        TextureHelper.Rectangle.Lines.horizontal(ctx0, rect, 50);
        TextureHelper.Rectangle.Lines.diagonal(ctx0, rect, 10, {x: 0.5, y: 1});
        TextureHelper.Rectangle.Lines.diagonal(ctx0, rect, 10, {x: -0.5, y: 1});

    };

    Viewport.prototype.renderResolutionGrid = function (gap, opacity)
    {
        gap = gap || 10;
        opacity = opacity || 0.15;

        var ctx = this.frontContext;

        ctx.strokeStyle = "rgba(0, 0, 255, " + opacity + ")";
        ctx.lineWidth = 1;

        var vpWidth = this.config.resolution.w;
        var vpHeight = this.config.resolution.h;

        ctx.beginPath();

        for (var x = 0; x < vpWidth; x += gap)
        {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, vpHeight);
        }

        for (var y = 0; y < vpHeight; y += gap)
        {
            ctx.moveTo(0, y);
            ctx.lineTo(vpWidth, y);
        }

        ctx.stroke();
    };

    Viewport.createCanvas = function (elem, resolution)
    {
        var canvas = document.createElement("canvas");
        canvas.width = resolution.w;
        canvas.height = resolution.h;

        $(canvas).attr('class', 'canvas-layer');

        $(elem).append(canvas);

        return canvas;
    };

    Viewport.defaultConfig = {
        layers: 2,
        resolution: {w: 1000, h: 1000}
    };

    return Viewport;
});

