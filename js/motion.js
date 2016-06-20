var ball = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var positionStart = null;

if (window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', function(eventData) {
        var x = event.beta; // In degree in the range [-180,180]
        var y = event.gamma; // In degree in the range [-90,90]
        var z = event.alpha; // In degree in the range [0,360]

        output.innerHTML = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";
        //output.innerHTML += "alpha: " + z + "\n";

        if(!positionStart) {
            positionStart = {
                x: x,
                y: y
            }
        }

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x > 15.5) {
            x = 15.5
        }else if (x < -15.5) {
            x = -15.5
        };

        if (y > 22.5 + positionStart.y) {
            y = 22.5 + positionStart.y
        }else if (y < -22.5 + positionStart.y) {
            y = -22.5 + positionStart.y
        };

        output.innerHTML += "x: " + x + "\n";
        output.innerHTML += "y: " + y + "\n";

        output.innerHTML += "start x: " + positionStart.x + "\n";
        output.innerHTML += "start y: " + positionStart.y + "\n";

        //output.innerHTML += "z: " + z + "\n";

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.left = ((maxX / 2) + x * 6) + "px";
        ball.style.top = ((maxY / 2) + ( y - positionStart.y ) * 4) + "px";

        output.innerHTML += "top: " + ball.style.top + "\n";
        output.innerHTML += "left: " + ball.style.left + "\n";

    }, false);

}
