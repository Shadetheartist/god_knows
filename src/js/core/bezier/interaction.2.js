Bezier.prototype.handleInteraction = function(canvasElem)
{
	this.selectedPoint = null;

	canvasElem.addEventListener("mousemove", function(event)
	{
		if (!this.points)
		{
			return;
		}

		var mouseCoords = this.getRelativeMouseCoords(event);

		var hoveringPoint = null;

		for (var i = 0; i < this.points.length; i++)
		{
			var p = this.points[i];

			if (Math.abs(mouseCoords.x - p.x) < 10 && Math.abs(mouseCoords.y - p.y) < 10)
			{
				hoveringPoint = p;
				break;
			}
		}

		canvasElem.style.cursor = hoveringPoint
			? "pointer"
			: "default";

		if(this.selectedPoint){
			console.log(this.selectedPoint);

			this.selectedPoint.x = mouseCoords.x;
			this.selectedPoint.y = mouseCoords.y;
			this.update();
		}


	}.bind(this));

	canvasElem.addEventListener("mousedown", function(evt) {
		console.log("down");

		var mouseCoords = this.getRelativeMouseCoords(event);

		for (var i = 0; i < this.points.length; i++)
		{
			var p = this.points[i];

			if (Math.abs(mouseCoords.x - p.x) < 10 && Math.abs(mouseCoords.y - p.y) < 10)
			{
				this.selectedPoint = this.points[i];
				break;
			}
		}

	}.bind(this));

	canvasElem.addEventListener("mouseup", function(evt)
	{
		console.log("up");
		this.selectedPoint = null;
	}.bind(this));
};

Bezier.prototype.getRelativeMouseCoords = function(event)
{
	event = event || window.event;

	var target = event.target || event.srcElement;

	var rect = target.getBoundingClientRect();

	var x = event.offsetX * (target.width / rect.width);
	var y = event.offsetY * (target.height / rect.height);

	var result = {x: x, y: y};

	return result;
};
