define(['core/util/bluebird'], function (Promise)
{
    function ImageLoader(options)
    {
        this.loaderCanvas = document.createElement('canvas');
        $(this.loaderCanvas).attr('hidden');
        this.images = [];
        options = options || ImageLoader.stylizeDefaultOptions;
    }

    ImageLoader.prototype.loadImage = function (url, loadedCallback)
    {
        var image = new Image();
        image.src = url;
        $(image).load(loadedCallback);

        //avoid gc ?
        this.images.push(image);
    };

    ImageLoader.defaultRGBAOptions = {
        url: null,
        bounds: {x: 0, y: 0, w: 100, h: 100},
        useImageDimensions: true
    };

    ImageLoader.prototype.getRGBAData = function (options)
    {
        var url = options.url;
        var bounds = options.bounds || ImageLoader.defaultRGBAOptions.bounds;
        var useImageDimensions = options.useImageDimensions || ImageLoader.defaultRGBAOptions.useImageDimensions;
        var loader = this;

        return new Promise(function (resolve)
            {
                l(useImageDimensions);
                var rgbaData = [];

                loader.loadImage(url, function ()
                {
                    if (useImageDimensions)
                    {
                        bounds.w = this.width;
                        bounds.h = this.height;
                    }

                    $(loader.loaderCanvas).attr('width', bounds.w);
                    $(loader.loaderCanvas).attr('height', bounds.h);

                    var ctx = loader.loaderCanvas.getContext('2d');

                    createImageBitmap(this).then(function (image)
                    {
                        l(image);
                        ctx.drawImage(image, 0, 0);
                        var imageData = ctx.getImageData(0, 0, bounds.w, bounds.h);
                        var arrLen = bounds.w * bounds.h;

                        for (var i = 0, o = 0; o < arrLen; i += 4, o++)
                        {
                            var r = imageData.data[i];
                            var g = imageData.data[i + 1];
                            var b = imageData.data[i + 2];
                            var a = imageData.data[i + 3] / 255; //alpha takes 0 < a < 1

                            //4 = dimensions of pixel (rgba)
                            var x = o % bounds.w;
                            var y = Math.floor(o / bounds.w);

                            rgbaData.push({
                                x: x,
                                y: y,
                                r: r,
                                g: g,
                                b: b,
                                a: a
                            });
                        }
                    }).then(function ()
                    {
                        resolve(rgbaData);
                    });
                });
            }
        );
    }
    ;

    return ImageLoader;
})
;


