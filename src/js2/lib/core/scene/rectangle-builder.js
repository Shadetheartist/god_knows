define(['core/viewport/texture-helper', 'core/geo/rectangle'], function (TextureHelper, Rectangle)
{
    function RectangleBuilder()
    {
        this.typeDivisor = 8;
        this.scale = 1;
    }

    RectangleBuilder.prototype.setScale = function (scale)
    {
        this.scale = scale;
    };

    RectangleBuilder.prototype.buildRect = function (data)
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
        rect.scale = this.scale;

        return rect;
    };

    RectangleBuilder.prototype.getRenderer = function (data)
    {
        var type = Math.floor(data.a / (255 / this.typeDivisor));

        switch (type)
        {
            case 0:
                return function (ctx)
                {
                };
            case 1:
                return function (ctx)
                {
                    ctx.fillStyle = this.color;

                    TextureHelper.Rectangle.dots(ctx, {
                        x: this.x,
                        y: this.y,
                        w: this.w,
                        h: this.h
                    }, this.scale / 2, 1);
                };
            case 2:
                return function (ctx)
                {
                    ctx.fillStyle = this.color;

                    TextureHelper.Rectangle.dots(ctx, {
                        x: this.x,
                        y: this.y,
                        w: this.w,
                        h: this.h
                    }, this.scale / 2.5, 1);

                };
            case 3:
                return function (ctx)
                {
                    ctx.fillStyle = this.color;
                    ctx.strokeStyle = this.color;

                    TextureHelper.Rectangle.Lines.diagonal(ctx,
                        {
                            x: this.x,
                            y: this.y,
                            w: this.w,
                            h: this.h
                        },  this.scale / 2, {x: -1, y: 2});

                };
            case 4:
                return (function ()
                {
                    if (Math.random() > 0.5)
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2, {x: -1, y: 2});
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2, {x: -1, y: 2});
                        };
                    }
                    else
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;

                            TextureHelper.Rectangle.Lines.vertical(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2);
                        };
                    }

                })();
            case 5:
                return (function ()
                {
                    if (Math.random() > 0.5)
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2, {x: -1, y: 1});
                            TextureHelper.Rectangle.Lines.horizontal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2);
                        };
                    }
                    else
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2, {x: 1, y: 1});
                            TextureHelper.Rectangle.Lines.vertical(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 2);
                        };
                    }

                })();

            case 6:
                return (function ()
                {
                    if (Math.random() > 0.5)
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 4, {x: -1, y: 1});
                        };
                    }
                    else
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 4, {x: 1, y: 1});
                        };
                    }

                })();

            case 7:
                return (function ()
                {
                    var r = Math.random();
                    if (r < 0.25)
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 4, {x: -1, y: 1});
                        };
                    }
                    else if(r < 0.5)
                    {
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.diagonal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, this.scale / 4, {x: 1, y: 1});
                        };
                    }
                    else if(r < 0.75){
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.vertical(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, 3);
                        };
                    }
                    else{
                        return function (ctx)
                        {
                            ctx.strokeStyle = this.color;
                            TextureHelper.Rectangle.Lines.horizontal(ctx,
                                {
                                    x: this.x,
                                    y: this.y,
                                    w: this.w,
                                    h: this.h
                                }, 3);
                        };
                    }
                })();

            case 8: //darkest
                return function (ctx)
                {
                    ctx.strokeStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.w, this.h);
                };
        }
    };

    return RectangleBuilder;
});


