
function Rectangle(x, y, w, h, parent){
    this.parent = parent || null;
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
}

Rectangle.prototype.render = function (ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

Rectangle.prototype.isCollide = function (rect) {
    return !(rect.x > this.x + this.w ||
    rect.x + rect.w < this.x ||
    rect.y > this.y + this.h ||
    rect.y + rect.h < this.y);
};