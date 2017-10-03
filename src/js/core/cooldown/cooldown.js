function CoolDown(coolDownTime, callback){
	this.coolDownTicks = coolDownTime;
	this.callback      = callback;
	this.lastTriggered = 0;
}

CoolDown.prototype.trigger = function(tick)
{
	if(this.canTrigger(tick) == false){
		return null;
	}

	this.lastTriggered = tick;

	if(this.callback && this.callback instanceof Function){
		return this.callback();
	}
};

CoolDown.prototype.canTrigger = function(tick)
{
	return (this.lastTriggered + this.coolDownTicks < tick);
};