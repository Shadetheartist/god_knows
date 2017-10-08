define(['core/viewport/texture-helper'], function(TextureHelper)
{
	function Viewport (elem, config)
	{
		this.config = config || Viewport.defaultConfig;

		this.elem = elem;

		this.canvas = Viewport.createCanvas(elem, this.config.resolution);

		this.canvas = $(elem).find("canvas").eq(0)[0];

		this.ctx = this.canvas.getContext('2d');
	}

	Viewport.prototype.test = function()
	{
		var rect = {x: 0, y: 0, w: 1000, h: 1000};

		this.ctx.strokeStyle = "rgba(0,0,0, 0.1)";

		this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

       	TextureHelper.Rectangle.dots(this.ctx, rect, 10);

       	TextureHelper.Rectangle.Lines.vertical(this.ctx, rect, 50);
		TextureHelper.Rectangle.Lines.horizontal(this.ctx, rect, 50);
        //TextureHelper.Rectangle.Lines.diagonal(this.ctx, rect, 10, {x: 1, y: 1});
        //TextureHelper.Rectangle.Lines.diagonal(this.ctx, rect,10, {x: 1, y: -1});
        TextureHelper.Rectangle.Lines.diagonal(this.ctx, rect, 10, {x: 0.5, y: 1});
        TextureHelper.Rectangle.Lines.diagonal(this.ctx, rect, 10, {x: -0.5, y: 1});
	};

	Viewport.prototype.renderResolutionGrid = function(gap, opacity)
	{
		gap     = gap || 10;
		opacity = opacity || 0.15;

		var ctx = this.ctx;

		ctx.strokeStyle = "rgba(0, 0, 255, " + opacity + ")";
		ctx.lineWidth   = 1;

		var vpWidth  = this.config.resolution.w;
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

	Viewport.createCanvas = function(elem, resolution)
	{
		var canvas    = document.createElement("canvas");
		canvas.width  = resolution.w;
		canvas.height = resolution.h;
		$(elem).append(canvas);

		return canvas;
	};

	Viewport.defaultConfig = {
		resolution: {w: 1000, h: 1000}
	};

	return Viewport;
});

