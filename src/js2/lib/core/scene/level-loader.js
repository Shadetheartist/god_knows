define(['core/util/bluebird'], function ()
{
    function LevelLoader()
    {
        this.canvas = document.createElement('canvas');
        $(this.canvas).attr('hidden');
        this.ctx = this.canvas.getContext('2d');
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

    LevelLoader.prototype.loadLevel = function (url)
    {
        var loader = this;

        var promise = new Promise(function (resolve)
        {
            var levelData = [];

            loader.loadImage(url, function ()
            {
                createImageBitmap(this).then(function (image)
                {
                    loader.ctx.drawImage(image, 0, 0);
                    var imageData = loader.ctx.getImageData(0, 0, loader.canvas.height, loader.canvas.width);

                    for (var i = 0; i < imageData.width * imageData.height; i += 4)
                    {
                        var r = imageData.data[i];
                        var g = imageData.data[i + 1];
                        var b = imageData.data[i + 2];
                        var a = imageData.data[i + 3];

                        if (a !== 0)
                        {
                            var x = i % imageData.width / 4;
                            var y = Math.floor(i / imageData.width) / 4;
                            levelData.push({x: x, y: y});
                        }
                    }
                }).then(function ()
                {
                    resolve(levelData);
                });
            });
        });

        return promise;
    };

    return LevelLoader;
});


