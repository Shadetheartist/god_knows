define(['core/editor/editor', 'core/viewport/viewport'], function()
{
	function Game(viewport){
		this.name = 'ayy'
		this.viewport = viewport || null;
	}

	Game.prototype.stat = function()
	{
		console.group('Game [' + this.name + '] stats');
		console.log(this);
		console.groupEnd();
	};

	return Game;
});




