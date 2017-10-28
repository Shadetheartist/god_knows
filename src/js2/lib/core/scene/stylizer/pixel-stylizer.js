define(['core/scene/level-loader', 'core/scene/rectangle-builder', 'core/scene/level', 'core/viewport/cache-helper', 'core/util/bluebird'], function (LevelLoader, GeoBuilder, Level, CacheHelper, Promise)
{
    function PixelStylizer(options)
    {
        options = options || ImageStylizer.stylizeDefaultOptions;
    }

    ImageStylizer.prototype.stylize = function (options)
    {
        options = options || ImageStylizer.stylizeDefaultOptions;
    };

    PixelStylizer.defaultOptions = {};

    return PixelStylizer;
});


