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

        direction = direction || {x: 1, y: 1};

        if (direction.y < 0)
        {
            direction.y *= -1;
        }

        var angle = Math.atan2(direction.y, direction.x);

        if (direction.x >= 0)
        {
            TextureHelper.Rectangle.Lines.angle(ctx, bounds, gap, angle)
        }
        else
        {
            TextureHelper.Rectangle.Lines.rAngle(ctx, bounds, gap, angle)
        }

    };

    TextureHelper.Rectangle.Lines.rAngle = function (ctx, bounds, gap, angle)
    {
        var CSC = 1 / Math.sin(angle);
        var TAN = Math.tan(angle);

        var BX1 = bounds.x;
        var BY1 = bounds.y;
        var BX2 = bounds.x + bounds.w;
        var BY2 = bounds.y + bounds.h;
        var BH = bounds.h;
        var X_LIM = BX2;

        var x1 = BX1;
        var y1 = BY2;
        var x2 = 0;
        var y2 = 0;

        //first X calculations
        var fxo = BH;
        var fxhypot = CSC * fxo;
        var fxhozLen = Math.sqrt((fxhypot * fxhypot) - (fxo * fxo));

        x1 -= fxhozLen;

        var lx1 = 0;
        var ly1 = 0;

        var lx2 = 0;
        var ly2 = 0;

        var i = 0;

        while (i < 100 && x1 < BX2)
        {
            i++;

            lx1 = x1;
            ly1 = y1;

            //for the left corner
            if (x1 < BX1)
            {
                var adjacent = BX1 - lx1;
                var opp = TAN * adjacent;

                lx1 = BX1;
                ly1 = BY2 + opp;
            }

            var o = bounds.h;
            var hypot = CSC * o;
            var hozLen = Math.sqrt((hypot * hypot) - (o * o));

            lx2 = x1 + hozLen;
            ly2 = BY2 - o;

            //for the right corner
            if (lx2 > BX2)
            {
                var adjacent = BX2 - lx2;
                var opp = TAN * adjacent;

                lx2 = BX2;
                ly2 += opp;
            }

            ctx.beginPath();
            ctx.moveTo(lx1, ly1);
            ctx.lineTo(lx2, ly2);
            ctx.stroke();

            x1 += gap;

        }


    };


    TextureHelper.Rectangle.Lines.angle = function (ctx, bounds, gap, angle)
    {
        var CSC = 1 / Math.sin(angle);
        var TAN = Math.tan(angle);

        var BX1 = bounds.x;
        var BY1 = bounds.y;
        var BX2 = bounds.x + bounds.w;
        var BY2 = bounds.y + bounds.h;
        var BH = bounds.h;
        var X_LIM = BX2;

        var x1 = BX1;
        var y1 = BY1;
        var x2 = 0;
        var y2 = 0;

        //first X calculations
        var fxo = BH;
        var fxhypot = CSC * fxo;
        var fxhozLen = Math.sqrt((fxhypot * fxhypot) - (fxo * fxo));

        x1 -= fxhozLen;

        var lx1 = 0;
        var ly1 = 0;

        var lx2 = 0;
        var ly2 = 0;

        var i = 0;

        while (i < 100 && x1 < BX2)
        {
            i++;

            lx1 = x1;
            ly1 = y1;

            //for the left corner
            if (x1 < BX1)
            {
                var adjacent = BX1 - lx1;
                var opp = TAN * adjacent;

                lx1 = BX1;
                ly1 = BY1 + opp;
            }


            var o = bounds.h;
            var hypot = CSC * o;
            var hozLen = Math.sqrt((hypot * hypot) - (o * o));

            lx2 = x1 + hozLen;
            ly2 = BY1 + o;

            //for the right corner
            if (lx2 > BX2)
            {
                var adjacent = BX2 - lx2;
                var opp = TAN * adjacent;

                lx2 = BX2;
                ly2 += opp;
            }

            ctx.beginPath();
            ctx.moveTo(lx1, ly1);
            ctx.lineTo(lx2, ly2);
            ctx.stroke();

            x1 += gap;

        }


    };

    return TextureHelper;
});


