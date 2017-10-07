define(function()
{
	function TextureHelper ()
	{
	}

	TextureHelper.Rectangle       = {};
	TextureHelper.Rectangle.Lines = {};

	TextureHelper.Rectangle.Lines.horizontal = function(ctx, bounds, gap)
	{
		gap    = gap || 4;
		var x  = bounds.x;
		var x2 = bounds.x + bounds.w;

		var y  = bounds.y;
		var y2 = bounds.y + bounds.h;

		ctx.beginPath();

		for (; y < y2; y += gap)
		{
			ctx.moveTo(x, y);
			ctx.lineTo(x2, y);
		}

		ctx.stroke();
	};

	TextureHelper.Rectangle.Lines.vertical = function(ctx, bounds, gap)
	{
		gap = gap || 4;

		var x  = bounds.x;
		var x2 = bounds.x + bounds.w;

		var y  = bounds.y;
		var y2 = bounds.y + bounds.h;

		ctx.beginPath();

		for (; x < x2; x += gap)
		{
			ctx.moveTo(x, y);
			ctx.lineTo(x, y2);
		}

		ctx.stroke();
	};

	TextureHelper.Rectangle.Lines.diagonal = function(ctx, bounds, gap, direction)
	{
		gap = gap || 20;

		direction = direction || {x: 2, y: 1}

		var angle = Math.atan2(direction.y, direction.x);

		TextureHelper.Rectangle.Lines.angle(ctx, bounds, gap, angle)

	};

	TextureHelper.Rectangle.Lines.angle = function(ctx, bounds, gap, angle)
	{
		var x1 = bounds.x;
		var y1 = bounds.y;

		var x2 = bounds.x + bounds.w;
		var y2 = bounds.y + bounds.h;

		var ax = (Math.sin(angle) * gap);
		var ay = (Math.cos(angle) * gap);

		var lx1 = bounds.x;
		var ly1 = bounds.y;

		var lx2 = bounds.x;
		var ly2 = bounds.y;

		ctx.beginPath();

		for(var i = 0; i < 100; i ++){
			x1 += ax;
			y2 += ay;

			var len = Math.sqrt((x1 * x1) + (y2 * y2));

			


			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);

		}

		ctx.stroke();

	};

	return TextureHelper;
});

