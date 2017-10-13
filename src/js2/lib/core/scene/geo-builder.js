define(['core/viewport/texture-helper', 'core/geo/rectangle'], function (TextureHelper, Rectangle)
{
    function GeoBuilder()
    {
        this.typeDivisor = 4;
        this.scale = 1;
    }

    GeoBuilder.prototype.setScale = function (scale)
    {
        this.scale = scale;
    };

    GeoBuilder.prototype.buildGeo = function (data)
    {
        data.x = data.x * this.scale;
        data.y = data.y * this.scale;

        var r = data.r;
        var g = data.g;
        var b = data.b;
        var a = data.a;

        var rect = new Rectangle(data.x, data.y, this.scale, this.scale);
        rect.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        rect.render = this.getRenderer(data).bind(rect);

        return rect;
    };

    GeoBuilder.prototype.getRenderer = function (data)
    {
        var type = Math.ceil(data.a / (256 / this.typeDivisor));

        switch (type)
        {
            case 0:
                return function (ctx)
                {
                };
            case 1:
                return function (ctx)
                {
                    ctx.strokeStyle = this.color;
                    TextureHelper.Rectangle.Lines.diagonal(ctx,
                        {
                            x: this.x,
                            y: this.y,
                            w: this.w,
                            h: this.h
                        }, 20, {x: 1, y: 1});
                };
            case 2:
                return function (ctx)
                {
                    ctx.strokeStyle = this.color;
                    TextureHelper.Rectangle.Lines.diagonal(ctx,
                        {
                            x: this.x,
                            y: this.y,
                            w: this.w,
                            h: this.h
                        }, 10, {x: -1, y: 1});

                };
            case 3:
                return function (ctx)
                {

                    ctx.strokeStyle = this.color;
                    TextureHelper.Rectangle.Lines.diagonal(ctx,
                        {
                            x: this.x,
                            y: this.y,
                            w: this.w,
                            h: this.h
                        }, 5);
                    TextureHelper.Rectangle.Lines.diagonal(ctx,
                        {
                            x: this.x,
                            y: this.y,
                            w: this.w,
                            h: this.h
                        }, 5, {x: -1, y: 1});

                };
            case 4:
                return function (ctx)
                {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.w, this.h);
                };
        }
    };

    return GeoBuilder;
});


