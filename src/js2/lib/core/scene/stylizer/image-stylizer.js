define(['core/scene/level-loader', 'core/scene/rectangle-builder', 'core/scene/level', 'core/viewport/cache-helper', 'core/scene/pixe;-stylizer', 'core/util/bluebird'], function (LevelLoader, GeoBuilder, Level, CacheHelper, PixelStylizer, Promise)
{
    function ImageStylizer(options)
    {
        options = options || ImageStylizer.stylizeDefaultOptions;
    }

    ImageStylizer.prototype.stylize = function (options)
    {
        options = options || ImageStylizer.stylizeDefaultOptions;
    };

    ImageStylizer.defaultOptions = {
        pixelStylizer: new PixelStylizer()
    };

    ImageStylizer.stylizeDefaultOptions = {
        image: null,
        scale: {x: 1, y: 1}
    };

    ImageStylizer.prototype.buildLevel = function (rawLevel)
    {
        var builder = this;

        return new Promise(function (resolve)
        {
            builder.loader
                .loadLevel(rawLevel)
                .then(function (levelData)
                {
                    builder.geoBuilder.setScale(rawLevel.scale);

                    var level = new Level();
                    var rect = null;
                    var w = rawLevel.bounds.w * rawLevel.scale;
                    var h = rawLevel.bounds.h * rawLevel.scale;
                    var tCtx = CacheHelper.getTempContext(w, h);

                    for (var i = 0; i < levelData.length; i++)
                    {
                        rect = builder.geoBuilder.buildRect(levelData[i]);
                        rect.render(tCtx);
                    }

                    level.backGround = tCtx;

                    resolve(level)
                });

        });

    };

    return ImageStylizer;
});


