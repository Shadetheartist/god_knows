function handleInteraction (cvs, curve) {
    curve.mouse = false;
    
    var fix = function(e) {
        e = e || window.event;
        
        var target = e.target || e.srcElement;
        
        var rect = target.getBoundingClientRect();
        
        var x = e.offsetX * (target.width / rect.width);
        var y = e.offsetY * (target.height / rect.height);

        //e.offsetX = e.clientX - rect.left;
        //e.offsetY = e.clientY - rect.top;
        
        //x -= rect.left;
        //y -= rect.top;
        
        e.offsetX = x;
        e.offsetY = y;



		return result;
    };
    
    var lpts   = curve.points;
    var moving = false, mx = my = ox = oy = 0, cx, cy, mp = {};
    
    var handler = {
        onupdate: function() {
            
        }
    };
    
    cvs.addEventListener("mousedown", function(evt) {
        var fixed = fix(evt);
        mx        = fixed.x;
        my        = fixed.y;
        
        console.log({x: mx, y: my});
        
        lpts.forEach(function(p) {
            if (Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10) {
                moving = true;
                mp     = p;
                cx     = p.x;
                cy     = p.y;
            }
        });
    });
    
    cvs.addEventListener("mousemove", function(evt) {
        fix(evt);
        
        var fixed = fix(evt);
        
        var found = false;
        
        if (!lpts) {
            return;
        }
        lpts.forEach(function(p) {
            var mx = fixed.x;
            var my = fixed.y;
            if (Math.abs(mx - p.x) < 10 && Math.abs(my - p.y) < 10) {
                found = found || true;
            }
        });
        cvs.style.cursor = found
            ? "pointer"
            : "default";
        
        if (!moving) {
            return handler.onupdate(evt);
        }
        
        ox   = fixed.x - mx;
        oy   = fixed.y - my;
        mp.x = cx + ox;
        mp.y = cy + oy;
        curve.update();
        handler.onupdate();
    });
    
    cvs.addEventListener("mouseup", function(evt) {
        if (!moving) {
            return;
        }
        // console.log(curve.points.map(function(p) { return p.x+", "+p.y; }).join(", "));
        moving = false;
        mp     = {};
    });
    
    return handler;
}
