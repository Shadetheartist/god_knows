define(['core/scene/level-data', 'core/scene/level-builder', 'core/util/bluebird'], function (LevelData, LevelBuilder, Promise)
{
    var levels = [
        new LevelData(
            'level 1',
            'images/levels/1.png',
            20,
            {
                x: 0,
                y: 0,
                w: 100,
                h: 100
            })
    ];

    var builder = new LevelBuilder();
    var promises = builder.buildLevels(levels);

    return Promise.all(promises);
});


