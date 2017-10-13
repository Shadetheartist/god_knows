define(['core/scene/level-loader', 'core/scene/geo-builder', 'core/scene/level', 'core/util/bluebird'], function (LevelLoader, GeoBuilder, Level, Promise)
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
                    var geo = [];
                    var rect = null;
                    for (var i = 0; i < levelData.length; i++)
                    {
                        rect = builder.geoBuilder.buildGeo(levelData[i]);
                        geo.push(rect);
                    }

                    level.coords = geo;

                    resolve(level)
                });

        });

    };

    return LevelBuilder;
});


