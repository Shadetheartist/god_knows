
function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Point.prototype.render = function (ctx) {
    ctx.fillRect(this.x, this.y, 1, 1);
};