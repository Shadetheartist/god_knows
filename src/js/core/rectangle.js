
function Rectangle(x, y, w ,h){
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
}

Rectangle.prototype.render = function (ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
};