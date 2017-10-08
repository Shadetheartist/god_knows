define(['core/editor/editor', 'core/viewport/viewport'], function()
{
	function Game(viewport, editor){
		this.name = 'ayy';
        this.viewport = viewport || null;
        this.editor = editor || null;
	}

	Game.prototype.stat = function()
	{
		console.group('Game [' + this.name + '] stats');
		console.log(this);
		console.groupEnd();
	};

	return Game;
});
