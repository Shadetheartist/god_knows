
function Environment(bounds)
{
    this.bounds = bounds;
    this.airResist = 0.1;
    this.gravity = 0.4;

    this.backgroundColor = "#7b8dff";
    this.darkSpace = 10000;
    this.darkSpaceColor = "#000";
}

Environment.prototype.render = function (ctx){

    //outside the realm
    ctx.fillStyle = this.darkSpaceColor;
    ctx.fillRect(
        this.bounds.x - this.darkSpace,
        this.bounds.y - this.darkSpace,
        this.bounds.w + this.darkSpace * 2,
        this.bounds.h + this.darkSpace * 2
    );

    //inside the realm
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
        this.bounds.x,
        this.bounds.y,
        this.bounds.w,
        this.bounds.h
    );

};
