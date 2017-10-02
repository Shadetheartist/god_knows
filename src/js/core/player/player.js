function Player(pos) {
    this.rect  = new Rectangle(0, 0, 10, 10);

    this.accel = new Point();
    this.moveAccel = new Point();
    this.maxSpeed = 12;

    this.bounciness = 0.075;
    this.decel = 0.75;
    this.airDecel = 0.96;
    this.speed = 1;

    this.jumpStrength = 8;

    //amount of horizontal momentum is transferred into vertical
    this.jumpTransferAmount = 0.1;

    this.touching = [];
    this.grounded = [];
}

Player.prototype.getCollidingBoxes = function (game) {
    game.quadTree.retrieve();
};

Player.prototype.update = function (game, dt) {

    if (Keys[Keys.left]) {
        this.move(-1);
    } else if (Keys[Keys.right]) {
        this.move(1);
    } else {
        if (this.isInAir()) {
            this.accel.x *= this.airDecel;
        }
        else {
            //slow down faster
            this.accel.x *= this.decel;// - ((this.decel * (1 + game.env.airResist)) - 1);
        }
    }

    if (Keys[Keys.up]) {
        this.jump();
    }

    //reduce effect of gravity when holding 'up' by a bit
    if (Keys[Keys.up]) {
        this.accel.y += game.gravity * 0.88;
    }
    else{
        this.accel.y += game.gravity;
    }


    this.rect.x += this.accel.x * dt;
    this.rect.y += this.accel.y * dt;

    this.touching.length = 0;
    this.grounded.length = 0;


    this.constrainToBounds(game.bounds);

    game.ctx.camera.target = {
        x: this.rect.x,
        y: this.rect.y * -0.1
    };

    var zoom = 1 + (Math.sqrt(this.accel.x * this.accel.x + this.accel.y * this.accel.y) / 200);

    game.ctx.camera.zoomTarget = {
        x: zoom,
        y: zoom
    };

};

Player.prototype.render = function (ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
        this.rect.x,
        this.rect.y,
        this.rect.w,
        this.rect.h
    );
};

Player.prototype.getHorizontalDir = function () {
    return Math.sign(this.accel.x);
};

Player.prototype.getVerticalDirection = function () {
    return Math.sign(this.accel.y);
};

Player.prototype.jump = function () {
    if (this.isInAir() === true) {
        return;
    }

    var transfer = Math.abs(this.accel.x) * this.jumpTransferAmount;

    this.accel.y -= this.jumpStrength + transfer;
    this.accel.x *= 1 - this.jumpTransferAmount;

};

Player.prototype.isInAir = function () {
    return this.grounded.length === 0;
};

Player.prototype.move = function (horizontalDir) {

    var mod = 1;

    if (this.isInAir() === true) {
        mod = 0.35;
        //make movement stronger when trying to turn around (weaker in air)
        if (Math.sign(horizontalDir) !== Math.sign(this.accel.x)) {
            mod += 0.5;
        }
    }
    else{
        //make movement stronger when trying to turn around
        if (Math.sign(horizontalDir) !== Math.sign(this.accel.x)) {
            mod += 2;
        }
    }



    var accel = this.accel.x + this.speed * horizontalDir * mod;

    this.accel.x = Math.min(Math.abs(accel), this.maxSpeed) * Math.sign(accel);
};

Player.prototype.constrainToBounds = function (bounds) {
    if (this.rect.x < bounds.x) {
        this.rect.x = bounds.x;
        this.accel.x *= -this.bounciness;
        this.touching.push(bounds);
    } else if (this.rect.x + this.rect.w > bounds.x + bounds.w) {
        this.rect.x = (bounds.x + bounds.w) - this.rect.w;
        this.accel.x *= -this.bounciness;
        this.touching.push(bounds);
    }

    if (this.rect.y < bounds.y) {
        this.rect.y = bounds.y;
        this.accel.y *= -this.bounciness;
        this.touching.push(bounds);
    } else if (this.rect.y + this.rect.h > bounds.y + bounds.h) {
        this.rect.y = (bounds.y + bounds.h) - this.rect.h;
        this.accel.y *= -this.bounciness;
        this.touching.push(bounds);
        this.grounded.push(bounds);
    }

};