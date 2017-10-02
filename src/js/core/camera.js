
function Camera()
{
    this.offset = {x: 0, y: 0};
    this.target = {x: 0, y: 0};
    this.zoomTarget = {x: 1, y: 1};
    this.zoom = {x: 1, y: 1};
}

Camera.prototype.update = function () {
    this.offset.x += (this.target.x - this.offset.x) * 0.1;
    this.offset.y += (this.target.y - this.offset.y) * 0.1;

    this.zoom.x += (this.zoomTarget.x - this.zoom.x) * 0.05;
    this.zoom.y += (this.zoomTarget.y - this.zoom.y) * 0.05;
};

