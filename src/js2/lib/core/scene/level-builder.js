define(['core/scene/level-loader', 'core/scene/geo-builder', 'core/scene/level', 'core/viewport/cache-helper', 'core/util/bluebird'], function (LevelLoader, GeoBuilder, Level, CacheHelper, Promise)
{
    function LevelBuilder()
    {
        this.loader = new LevelLoader();
        this.geoBuilder = new GeoBuilder();
    }

    LevelBuilder.prototype.buildLevels = function (rawLevels)
    {
        var levelPromises = [];

        for (var i = 0; i < rawLevels.length; i++)
        {
            levelPromises.push(this.buildLevel(rawLevels[i]));
        }

        return levelPromises;
    };

    LevelBuilder.prototype.buildLevel = function (rawLevel)
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

    return LevelBuilder;
});


