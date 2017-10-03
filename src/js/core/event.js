function Event (name, context)
{
	this.name = name;
	this.handlers = [];
	this.context = context || null;
}

Event.registeredEvents = [];

Event.register = function(event)
{
	Event.registeredEvents[event.name] = event;
};

Event.on = function(name, callback)
{
	var event = Event.getEvent(name);

	if(!event){
		return;
	}

	event.handlers.push(callback);
};

Event.trigger = function(name)
{
	Event.getEvent(name);

	if(!event){
		return;
	}

	for(var i = 0; i < event.handlers.length; i++){
		event.handlers(event.context);
	}
};

Event.getEvent = function(name)
{
	var event = Event.registeredEvents[name];

	return event;
};