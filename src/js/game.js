
function Game(canvas, bounds) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bounds = bounds;
    this.player = null;
    this.quadTree = new Quadtree(this.bounds);
    this.state = 1;
    this.gravity = 0.4;
    this.lastUpdateTime = Date.now();
    this.targetFramerate = 60;
    this.boxes = [];

}

Game.prototype.updateQuadTree = function () {
    this.quadTree.insert(this.player);

    for(var i = 0; i < this.boxes.length; i++){
        this.quadTree.insert(this.boxes[i].rect);
    }

    this.quadTree.insert(this.player);

};

Game.prototype.update = function () {

    var now = Date.now();

    var dt = (now - this.lastUpdateTime) * (this.targetFramerate/1000);

    this.updateQuadTree();

    for(var i = 0; i < this.boxes.length; i++){
        this.boxes[i].update(this, dt);
    }

    this.player.update(this, dt);

    this.ctx.camera.update();

    this.lastUpdateTime = now;
};

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

    for(var i = 0; i < this.boxes.length; i++){
        this.boxes[i].render(this.ctx);
    }

    this.player.render(this.ctx);

    this.ctx.restore();
};

Game.prototype.tick = function () {
    if(this.state === 1) {
        this.render();
        this.update();
        this.quadTree.clear();
        window.requestAnimationFrame(this.tick.bind(this));
    }
};

Game.prototype.start = function () {
    window.requestAnimationFrame(this.tick.bind(this));
};

Game.prototype.stop = function () {
    this.state = 0;
};
