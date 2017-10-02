var Keys = {};

Keys.keyDown = function (event) {
    Keys[event.keyCode] = true;
};

Keys.keyUp = function (event) {
    Keys[event.keyCode] = false;
};

Keys.left = 37;
Keys.up = 38;
Keys.right = 39;
Keys.down = 40;

document.onkeydown = Keys.keyDown;
document.onkeyup = Keys.keyUp;
