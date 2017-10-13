define(function ()
{
    function Rectangle(x, y, w, h)
    {
        this.x = x || 0;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "#000";
    }

    Rectangle.prototype.render = function(ctx)
    {

    };


    return Rectangle;
});


