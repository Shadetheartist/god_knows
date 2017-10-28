define(['core/util/bluebird'], function ()
{
    function LevelLoader()
    {
        this.canvas = document.createElement('canvas');
        $(this.canvas).attr('hidden');
        this.images = [];
    }

    LevelLoader.prototype.loadImage = function (url, loadedCallback)
    {
        var image = new Image();
        image.src = url;
        $(image).load(loadedCallback);

        //avoid gc
        this.images.push(image);
    };

    LevelLoader.prototype.loadLevel = function (level)
    {

        return promise;
    };

    return LevelLoader;
});


