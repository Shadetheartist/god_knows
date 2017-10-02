function Player(pos)
{
    this.rect = new Rectangle(0, 0, 10, 10, this);

    this.accel = new Point();
    this.moveAccel = new Point();
    this.maxSpeed = 9;

    this.bounciness = 0.075;
    this.decel = 0.70;
    this.airDecel = 0.96;
    this.acceleration = 0.5;

    this.jumpStrength = 7.5;

    //amount of horizontal momentum is transferred into vertical
    this.jumpTransferAmount = 0.075;

    this.touching = [];
    this.grounded = [];
}

Player.prototype.update = function (game, dt)
{

    if (Keys[Keys.left])
    {
        this.move(-1);
    }
    else if (Keys[Keys.right])
    {
        this.move(1);
    }
    else
    {
        if (this.isInAir())
        {
            this.accel.x *= this.airDecel;
        }
        else
        {
            //slow down faster
            this.accel.x *= this.decel;// - ((this.decel * (1 + game.env.airResist)) - 1);
        }
    }

    if (Keys[Keys.up])
    {
        this.jump();
    }

    //reduce effect of gravity when holding 'up' by a bit (while going up)
    if (Keys[Keys.up] && this.accel.y < 0)
    {
        this.accel.y += game.gravity * 0.8;
    }
    else
    {
        this.accel.y += game.gravity;
    }


    this.rect.x += this.accel.x * dt;
    this.rect.y += this.accel.y * dt;

    this.touching.length = 0;
    this.grounded.length = 0;

    this.handleBoxCollisions(game);

    this.constrainToBounds(game.bounds);

    game.ctx.camera.target = {
        x: this.rect.x,
        y: this.rect.y * -0.1
    };

    var zoom = 1 - (Math.sqrt(this.accel.x * this.accel.x + this.accel.y * this.accel.y) / 250);

    game.ctx.camera.zoomTarget = {
        x: zoom,
        y: zoom
    };

};

Player.prototype.render = function (ctx)
{
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
        this.rect.x,
        this.rect.y,
        this.rect.w,
        this.rect.h
    );
};


Player.prototype.handleBoxCollisions = function (game)
{
    return game.quadtree.retrieve(this.rect, function (obj)
    {
        //dont collide with self
        if (obj.parent === this)
        {
            return;
        }

        var a = this.rect;
        var b = obj;

        if (this.rect.isCollide(b))
        {
            game.ctx.strokeRect(b.x, b.y, b.w, b.h);

            var centerA = new Point(a.x + a.w / 2, a.y + a.h / 2);
            var centerB = new Point(b.x + b.w / 2, b.y + b.h / 2);
            var temp = new Point(0, 0);

            if (centerA.x > centerB.x)
            {
                temp.x = a.x;
            }
            else
            {
                temp.x = a.x + a.w;
            }

            if (centerA.y > centerB.y)
            {
                temp.y = a.y;
            }
            else
            {
                temp.y = a.y + a.h;
            }

            centerA = temp;

            var distance = new Point(centerB.x - centerA.x, centerB.y - centerA.y);
            distance.normalize();


            if (Math.abs(distance.x) / (b.w / b.h) > Math.abs(distance.y))
            {
                //a is on right of b
                if (distance.x > 0)
                {
                    //makes sure the player is going the right direction to latch
                    if (this.accel.x > 0)
                    {
                        a.x = b.x - a.w;
                        this.accel.x = 0;
                    }
                }
                //a is left right of b
                else
                {
                    //makes sure the player is going the right direction to latch
                    if (this.accel.x < 0)
                    {
                        a.x = b.x + b.w;
                        this.accel.x = 0;
                    }
                }

            }
            else
            {
                //a is on top of b
                if (distance.y > 0)
                {
                    //player has to 'fall' onto a block, cant be going up and latch to the top
                    if (this.accel.y > 0)
                    {
                        this.grounded.push(b);
                        this.accel.y = 0;
                        a.y = b.y - a.h;
                    }
                }
                //a is below of b
                else
                {
                    if (this.accel.y < 0)
                    {
                        this.rect.y -= this.rect.y;
                        a.y = b.y + b.h;
                        this.accel.y = 0;
                    }
                }

            }
        }
    }.bind(this));
};

Player.prototype.jump = function ()
{
    if (this.isInAir() === true)
    {
        return;
    }

    var transfer = Math.abs(this.accel.x) * this.jumpTransferAmount;

    this.accel.y -= this.jumpStrength + transfer;
    this.accel.x *= 1 - this.jumpTransferAmount;

};

Player.prototype.isInAir = function ()
{
    return this.grounded.length === 0;
};

Player.prototype.move = function (horizontalDir)
{

    var mod = 1;

    if (this.isInAir() === true)
    {
        mod = 0.3;
        //make movement stronger when trying to turn around (weaker in air)
        if (Math.sign(horizontalDir) !== Math.sign(this.accel.x))
        {
            mod += 0.6;
        }
    }
    else
    {
        //make movement stronger when trying to turn around
        if (Math.sign(horizontalDir) !== Math.sign(this.accel.x))
        {
            mod += .75;
        }
    }

    var accel = this.accel.x + this.acceleration * horizontalDir * mod;

    this.accel.x = Math.min(Math.abs(accel), this.maxSpeed) * Math.sign(accel);
};

Player.prototype.constrainToBounds = function (bounds)
{
    if (this.rect.x < bounds.x)
    {
        this.rect.x = bounds.x;
        this.accel.x *= -this.bounciness;
        this.touching.push(bounds);
    }
    else if (this.rect.x + this.rect.w > bounds.x + bounds.w)
    {
        this.rect.x = (bounds.x + bounds.w) - this.rect.w;
        this.accel.x *= -this.bounciness;
        this.touching.push(bounds);
    }

    if (this.rect.y < bounds.y)
    {
        this.rect.y = bounds.y;
        this.accel.y *= -this.bounciness;
        this.touching.push(bounds);
    }
    else if (this.rect.y + this.rect.h > bounds.y + bounds.h)
    {
        this.rect.y = (bounds.y + bounds.h) - this.rect.h;
        this.accel.y *= -this.bounciness;
        this.touching.push(bounds);
        this.grounded.push(bounds);
    }

};