var ball = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var iteratorX = maxX / 90;
var iteratorY = maxY / 45;

if (window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', function(eventData) {
        var x = event.beta; // In degree in the range [-180,180]
        var y = event.gamma; // In degree in the range [-90,90]
        var z = event.alpha; // In degree in the range [0,360]

        output.innerHTML = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";
        //output.innerHTML += "alpha: " + z + "\n";
        output.innerHTML += "maxX: " + maxX + "\n";
        output.innerHTML += "maxY: " + maxY + "\n";

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x > 15.5) {
            x = 15.5
        };
        if (x < -15.5) {
            x = -15.5
        };

        if (y > 22.5) {
            y = 22.5
        };
        if (y < -22.5) {
            y = -22.5
        };

        output.innerHTML += "x: " + x + "\n";
        output.innerHTML += "y: " + y + "\n";
        //output.innerHTML += "z: " + z + "\n";

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.left = ((maxX / 2) + x * 6) + "px";
        ball.style.top = ((maxY / 2) + y * 4) + "px";

        output.innerHTML += "top: " + ball.style.top + "\n";
        output.innerHTML += "left: " + ball.style.left + "\n";

    }, false);

}
