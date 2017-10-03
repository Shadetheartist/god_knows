Bezier.prototype.drawSkeleton = function(ctx)
{
	var pts = this.points;

	ctx.strokeStyle = "lightgrey";

	this.drawLine(ctx, pts[0], pts[1]);

	if (pts.length === 3)
	{
		this.drawLine(ctx, pts[1], pts[2]);
	}
	else
	{
		this.drawLine(ctx, pts[2], pts[3]);
	}
};

Bezier.prototype.drawLine = function(ctx, p1, p2)
{
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
};

Bezier.prototype.drawCurve = function(ctx)
{
	ctx.strokeStyle = "black";

	ctx.beginPath();

	var p = this.points;

	ctx.moveTo(p[0].x, p[0].y);
	if (p.length === 3)
	{
		ctx.quadraticCurveTo(
			p[1].x, p[1].y,
			p[2].x, p[2].y
		);
	}
	else if (p.length === 4)
	{
		ctx.bezierCurveTo(
			p[1].x, p[1].y,
			p[2].x, p[2].y,
			p[3].x, p[3].y
		);
	}

	ctx.stroke();
	ctx.closePath();
};

Bezier.prototype.drawPoint = function(ctx, p)
{
	ctx.strokeStyle = "#00f";

	ctx.beginPath();
	ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
	ctx.stroke();
};

Bezier.prototype.drawPoints = function(ctx, points)
{
	points = points || this.points;

	for (var i = 0; i < points.length; i++)
	{
		this.drawPoint(ctx, points[i], 3);
	}
};

Bezier.prototype.drawArc = function(ctx, p)
{
	ctx.beginPath();
	ctx.moveTo(p.x, p.y);
	ctx.arc(p.x, p.y, p.r, p.s, p.e);
	ctx.lineTo(p.x, p.y);
	ctx.fill();
	ctx.stroke();
};

Bezier.prototype.drawCircle = function(ctx, p, r)
{
	ctx.beginPath();
	ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
	ctx.stroke();
};