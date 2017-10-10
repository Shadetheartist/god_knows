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
        var loader = this;

        var promise = new Promise(function (resolve)
        {
            var levelData = [];

            loader.loadImage(level.url, function ()
            {
                //no fucking clue why but these are supposed to be swapped, unless im dumb as fuck
                $(loader.canvas).attr('width', level.bounds.h);
                $(loader.canvas).attr('height', level.bounds.w);
                var ctx = loader.canvas.getContext('2d');

                createImageBitmap(this).then(function (image)
                {
                    ctx.drawImage(image, 0, 0);
                    var imageData = ctx.getImageData(0, 0, loader.canvas.height, loader.canvas.width);
                    var arrLen = imageData.width * imageData.height * 4;
                    l(imageData);
                    var bounds = level.bounds;
                    for (var i = 0; i < arrLen; i += 4)
                    {
                        var r = imageData.data[i];
                        var g = imageData.data[i + 1];
                        var b = imageData.data[i + 2];
                        var a = imageData.data[i + 3];

                        if (a !== 0)
                        {
                            var x = (i / 4) % imageData.width;
                            var y = (Math.floor((i / 4) / imageData.width) - imageData.height) + bounds.y + bounds.h;

                            if (
                                x < bounds.x ||
                                x >= bounds.x + bounds.w ||
                                y < bounds.y ||
                                y >= bounds.y + bounds.h)
                            {
                                l('image data has been truncated.');
                                continue;
                            }

                            if (x < bounds.x)
                            {
                                continue;
                            }
                            if (x < bounds.x)
                            {
                                continue;
                            }


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


