function Box(x, y, w, h) {
    this.rect = new Rectangle(x, y, w, h);
    this.color = "#BBB";
}

Box.prototype.update = function (game, dt) {

};

Box.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    this.rect.render(ctx);
};
