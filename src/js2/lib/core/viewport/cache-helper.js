define(function ()
{
    function CacheHelper()
    {

    }

    CacheHelper.getTempContext = function (width, height)
    {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        return canvas.getContext('2d');
    };

    return CacheHelper;
});


