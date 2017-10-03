var Keys = {};

Keys.keyDown = function (event) {
    Keys[event.keyCode] = true;
};

Keys.keyUp = function (event) {
    Keys[event.keyCode] = false;
};

Keys.isPressed = function (keycodes) {
    for(var i = 0; i < keycodes.length; i++){
        if(Keys[keycodes[i]]){
            return true;
        }
    }
};

Keys.left = [37, 65];
Keys.up = [38, 87];
Keys.right = [39, 68];
Keys.down = [40, 83];

document.onkeydown = Keys.keyDown;
document.onkeyup = Keys.keyUp;
