function TickTimeout (callback, triggerTick, id)
{
	this.id          = triggerTick;
	this.triggerTick = triggerTick;
	this.callback    = callback;
}

Game.prototype.tickTimeouts       = [];
Game.prototype.tickTimeoutCounter = 0;

Game.prototype.setTickTimeout = function(callback, ticks)
{
	var timeout = new TickTimeout(callback, ticks + this.tick, this.tickTimeoutCounter);

	this.tickTimeouts.push(timeout);
	this.tickTimeoutCounter++;

	return timeout;
}

Game.prototype.updateTickTimeouts = function()
{
	var removeTicks = [];

	for (var i = 0; i < this.tickTimeouts.length; i++)
	{
		if (this.tickTimeouts[i].triggerTick <= this.tick)
		{
			this.tickTimeouts[i].callback();
			removeTicks.push(i);
		}
	}

	for (var i = 0; i < removeTicks.length; i++)
	{
		this.tickTimeouts.splice(i, 1);
	}
}