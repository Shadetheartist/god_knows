define(['core/scene/level-data', 'core/scene/level-builder', 'core/util/bluebird'], function (LevelData, LevelBuilder, Promise)
{
    var levels = [
        new LevelData('level 1', 'images/levels/1.png', 10, {x: 0, y: 1000, w: 10000, h: -1000})
    ];

    var builder = new LevelBuilder();
    var promises = builder.buildLevels(levels);

    return Promise.all(promises);
});


