var ball = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var iteratorX = maxX / 360;

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
        if (x > 90) {
            x = 90
        };
        if (x < -90) {
            x = -90
        };

        // To make computation easier we shift the range of
        // x and y to [0,180]
        //if (y < 0) { y = y + 180 }
        //if (z < 180) { z = 360 - z }
        //if (z > 180) { z = z - 180 }

        output.innerHTML += "x: " + x + "\n";
        output.innerHTML += "y: " + y + "\n";
        //output.innerHTML += "z: " + z + "\n";

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.left = ((maxX / 2) + x) + "px";
        ball.style.top = ((maxY / 2) + y) + "px";

        output.innerHTML += "top: " + ball.style.top + "\n";
        output.innerHTML += "left: " + ball.style.left + "\n";

    }, false);

    // window.addEventListener("devicemotion", function(event) {
    //     output.innerHTML = "acceleration x: " + event.accelerationIncludingGravity.x + "\n";
    //     output.innerHTML += "acceleration y: " + event.accelerationIncludingGravity.y + "\n";
    //     output.innerHTML += "acceleration z: " + event.accelerationIncludingGravity.z + "\n";
    //
    //
    //     //  document.getElementByID("output2").innerHTML = "acceleration x: " + event.accelerationIncludingGravity.x +
    //     // "y: " + event.accelerationIncludingGravity.y + " z: " + event.accelerationIncludingGravity.z +
    //     // " / Rotation Rate alpha " +
    //     // event.rotationRate.alpha + " beta " + event.rotationRate.beta + " gamma " + event.rotationRate.gamma;
    // }, true);

}
