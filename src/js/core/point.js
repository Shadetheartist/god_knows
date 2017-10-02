
function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Point.prototype.render = function (ctx) {
    ctx.fillRect(this.x, this.y, 1, 1);
};

Point.prototype.normalize = function () {
    var magnitude = Math.abs(Math.sqrt((this.x * this.x) + (this.y * this.y)));
    this.x /= magnitude;
    this.y /= magnitude;
};
