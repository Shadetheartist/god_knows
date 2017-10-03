function CoolDown(coolDownTime, callback){
	this.coolDownTime = coolDownTime;
	this.callback = callback;
	this.lastTriggered = Date.now();
}

CoolDown.prototype.trigger = function()
{
	if(this.canTrigger() == false){
		return null;
	}

	this.lastTriggered = Date.now();

	if(this.callback && this.callback instanceof Function){
		return this.callback();
	}
};

CoolDown.prototype.canTrigger = function()
{
	return (this.lastTriggered + this.coolDownTime < Date.now());
};