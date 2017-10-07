define(function ()
{
    function TextureHelper()
    {
    }

    TextureHelper.Rectangle = {};


    TextureHelper.Rectangle.dots = function (ctx, bounds, gap)
    {
        gap = gap || 8;
        var x = bounds.x;
        var x2 = bounds.x + bounds.w;

        var y = bounds.y;
        var y2 = bounds.y + bounds.h;

        ctx.beginPath();

        for (; y < y2; y += gap)
        {
            for (var tx = x + gap; tx < x2; tx += gap)
            {
                ctx.moveTo(tx, y);
                ctx.lineTo(tx + 1, y + 1);
            }

            ctx.moveTo(x, y);
            ctx.lineTo(x + 1, y + 1);
        }

        ctx.stroke();
    };

    TextureHelper.Rectangle.Lines = {};

    TextureHelper.Rectangle.Lines.horizontal = function (ctx, bounds, gap)
    {
        gap = gap || 10;
        var x = bounds.x;
        var x2 = bounds.x + bounds.w;

        var y = bounds.y;
        var y2 = bounds.y + bounds.h;

        ctx.beginPath();

        for (; y < y2; y += gap)
        {
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y);
        }

        ctx.stroke();
    };

    TextureHelper.Rectangle.Lines.vertical = function (ctx, bounds, gap)
    {
        gap = gap || 10;

        var x = bounds.x;
        var x2 = bounds.x + bounds.w;

        var y = bounds.y;
        var y2 = bounds.y + bounds.h;

        ctx.beginPath();

        for (; x < x2; x += gap)
        {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y2);
        }

        ctx.stroke();
    };

    TextureHelper.Rectangle.Lines.diagonal = function (ctx, bounds, gap, direction)
    {
        gap = gap || 10;

        direction = direction || {x: 1, y: 2};

        var angle = Math.atan2(direction.y, direction.x);

        TextureHelper.Rectangle.Lines.angle(ctx, bounds, gap, angle)

    };

    TextureHelper.Rectangle.Lines.angle = function (ctx, bounds, gap, angle)
    {
        var ax = Math.cos(angle);
        var ay = Math.sin(angle);

        var csc = 1 / Math.sin(angle);
        var tan = Math.tan(angle);

        console.log({ax: ax, ay: ay});

        var x1 = bounds.x;
        var y1 = bounds.y;

        var x2 = bounds.x + bounds.w;
        var y2 = bounds.y + bounds.h;

        //todo not 100
        var lx1 = x1 - 100;
        var ly1 = y1;

        var lx2 = x1;
        var ly2 = y1;

        ctx.beginPath();

        while (lx1 < x2)
        {

            var gx = null;
            var gy = null;

            if(lx1 < x1){
                var adjacent = x1 - lx1;
                var opp = tan * adjacent;

                if(opp > bounds.h - gap){
                    lx1 += gap;
                    continue;
                }


                gx = x1;
                gy = y1 + opp;
            }



            var o = bounds.h;
            var hypot = csc * o;
            var hozLen = Math.sqrt((hypot * hypot) - (o * o));

            lx2 = lx1 + hozLen;
            ly2 = y1 + o;

            if(lx2 > x2){
                var adjacent = x2 - lx2;
                var opp = tan * adjacent;

                lx2 = x2;
                ly2 += opp;

            }

            ctx.moveTo(gx || lx1, gy || ly1);
            ctx.lineTo(lx2, ly2);

            lx1 += gap;

        }

        ctx.stroke();

    };

    return TextureHelper;
});


