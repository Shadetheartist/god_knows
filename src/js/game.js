function Game(canvas, bounds) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bounds = bounds;
	this.player = null;
	this.tick = 0;

    this.quadtree = new Quadtree.init({
        x: bounds.x,
        y: bounds.y,
        w: bounds.w,
        h: bounds.h,
        maxChildren: 4,
        maxDepth: 3
    });

    this.state = 1;
    this.lastUpdateTime = Date.now();
    this.targetFramerate = 60;
    this.boxes = [];
}

Game.prototype.updateQuadTree = function () {

    for (var i = 0; i < this.boxes.length; i++) {
        this.quadtree.insert(this.boxes[i].rect);
    }

    this.quadtree.insert(this.player.rect);

};

Game.prototype.update = function () {

    var now = Date.now();

    var dt = (now - this.lastUpdateTime) * (this.targetFramerate / 1000);

    if(dt > 5){
        console.log(dt);
        dt = 0;
    }

    this.updateQuadTree();

    for (var i = 0; i < this.boxes.length; i++) {
        this.boxes[i].update(this, dt);
    }

    this.player.update(this, dt);

    this.ctx.camera.update();
    
    this.updateCamera();
    
    this.lastUpdateTime = now;
};

Game.prototype.updateCamera = function (game)
{
    this.ctx.camera.target = {
        x: this.player.rect.x,
        y: this.player.rect.y * -0.1
    };
    
    var zoom = 1 - (Math.sqrt(this.player.accel.x * this.player.accel.x + this.player.accel.y * this.player.accel.y) / 250);
    
    this.ctx.camera.zoomTarget = {
        x: zoom,
        y: zoom
    };
}

Game.prototype.render = function () {

    this.ctx.clearRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);

    this.ctx.save();

    this.ctx.translate(this.canvas.width / 2 - (this.bounds.w / 2), this.canvas.height / 2 - (this.bounds.h / 2));
    this.ctx.translate(-this.ctx.camera.offset.x + this.bounds.w / 2, this.ctx.camera.offset.y);

    //scale to middle of bounds (probably needs to be changed at some point)
    this.ctx.translate((this.bounds.w / 2), (this.bounds.h / 2));
    this.ctx.scale(this.ctx.camera.zoom.x, this.ctx.camera.zoom.y);
    this.ctx.translate(-(this.bounds.w / 2), -(this.bounds.h / 2));


    this.env.render(this.ctx);

    for (var i = 0; i < this.boxes.length; i++) {
        this.boxes[i].render(this.ctx);
    }

    this.player.render(this.ctx);

    this.quadtree.render(this.ctx);

    this.ctx.restore();
};

Game.prototype.loop = function () {
    if (this.state === 1) {
        this.update();
        this.render();
        this.quadtree.clear();
        window.requestAnimationFrame(this.loop.bind(this));
    }

	this.updateTickTimeouts();

	this.tick++;
};

Game.prototype.start = function () {
    this.loop();
};

Game.prototype.stop = function () {
    this.state = 0;
};
