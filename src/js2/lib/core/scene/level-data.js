define(function ()
{
    function LevelData(name, url, scale)
    {
        this.name = name || 'unnamed';
        this.scale = scale || 50;
        this.url = url || null;

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


