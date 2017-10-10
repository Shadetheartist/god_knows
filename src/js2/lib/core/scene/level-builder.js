define(['core/scene/level-loader', 'core/scene/level', 'core/util/bluebird'], function (LevelLoader, Level, Promise)
{
    function LevelBuilder()
    {
        this.loader = new LevelLoader();
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

        var promise = new Promise(function (resolve)
        {
            builder.loader
                .loadLevel(rawLevel.url)
                .then(function (levelData)
                {
                    var level = new Level();
                    var scaledData = [];
                    for (var i = 0; i < levelData.length; i++)
                    {
                        var x = levelData[i].x * rawLevel.scale;
                        var y = levelData[i].y * rawLevel.scale;
                        scaledData.push({x: x, y: y});
                    }

                    level.coords = scaledData;

                    resolve(level)
                });

        });

        return promise;

    };

    return LevelBuilder;
});


