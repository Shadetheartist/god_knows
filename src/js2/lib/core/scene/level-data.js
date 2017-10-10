define(function ()
{
    function LevelData(name, url, scale, bounds)
    {
        this.name = name || 'unnamed';
        this.url = url || null;
        this.bounds = bounds;
        this.scale = scale || 50;

        if(url === null){
            throw 'level url is null';
        }
    }

    LevelData.defaultOptions = {
        name: 'unnamed',
        scale: 100,
        url: null //image url
    };

    return LevelData;
});


