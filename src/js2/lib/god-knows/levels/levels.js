define(['core/scene/level-data', 'core/scene/level-builder', 'core/util/bluebird'], function (LevelData, LevelBuilder, Promise)
{
    var levels = [
        new LevelData('level 1', 'images/levels/1.png', 10)
    ];

    var builder = new LevelBuilder();
    var promises = builder.buildLevels(levels);

    Promise.all(promises).then(function (levels)
    {
        l(levels);
    });

    return levels;
});


