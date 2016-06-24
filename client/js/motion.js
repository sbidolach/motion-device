var ball = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

var positionStart;

var yLimit = 22.5;
var yUpLimit, yDownLimit, yMiddlePoint, yStep;


if (window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', function(eventData) {
        var x = event.beta; // In degree in the range [-180,180]
        var y = event.gamma; // In degree in the range [-90,90]
        var z = event.alpha; // In degree in the range [0,360]

        output.innerHTML = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";
        //output.innerHTML += "alpha: " + z + "\n";

        if (!positionStart) {
            positionStart = {
                x: x,
                y: y
            }

            // get up and down limit bound for axis y and middle point
            if (!yUpLimit && !yDownLimit) {
                if (y < 0) {
                    yUpLimit = y + yLimit;
                    yDownLimit = y - yLimit;
                    if (yDownLimit < -90) {
                        yDownLimit = 90 + (90 + yDownLimit);
                    }
                } else if (y >= 0) {
                    yDownLimit = y - yLimit;
                    yUpLimit = y + yLimit;
                    if (yUpLimit > 90) {
                        yUpLimit = -90 - (90 - yUpLimit);
                    }
                }

                var size = null;
                if (yUpLimit < yDownLimit) {
                    size = yDownLimit - yUpLimit;
                } else {
                    size = 90 + yDownLimit + (90 - yUpLimit)
                }

                if (y > 0) {
                    yMiddlePoint = yDownLimit - (size / 2);
                } else {
                    yMiddlePoint = yUpLimit + (size / 2);
                }

            }

        }

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        var xRightLimit = positionStart.x + 15.5;
        var xLeftLimit = positionStart.x - 15.5;
        if (x > xRightLimit) {
            x = xRightLimit;
        } else if (x < xLeftLimit) {
            x = xLeftLimit;
        };

        // limita area for axis y
        if (yDownLimit > yUpLimit) {

            if (y > yUpLimit && y < yMiddlePoint) {
                y = yUpLimit;
            } else if (y < yDownLimit && y > yMiddlePoint) {
                y = yDownLimit;
            }

            if ((positionStart.y < 0 && y < 0) || (positionStart.y > 0 && y > 0)) {
                yStep = y - positionStart.y;
            }
            // TODO new condition at bottom
            else {
                yStep = y - yDownLimit;
            }

        } else {

            if (yMiddlePoint < 0) {
                if ((y > yUpLimit && y < 90) || (y > -90 && y < yMiddlePoint)) {
                    y = yUpLimit;
                } else if (y < yDownLimit && y > yMiddlePoint) {
                    y = yDownLimit;
                }
            } else {
                if ((y > yUpLimit && y < yMiddlePoint)) {
                    y = yUpLimit;
                } else if ((y < yDownLimit && y > -90) || (y < 90 && y > yMiddlePoint)) {
                    y = yDownLimit;
                }
            }

            yStep = y - positionStart.y;

        }

        output.innerHTML += "yUpLimit: " + yUpLimit + "\n";
        output.innerHTML += "yDownLimit: " + yDownLimit + "\n";
        output.innerHTML += "yMiddle: " + yMiddlePoint + "\n";
        output.innerHTML += "yStep: " + yStep + "\n";

        output.innerHTML += "x: " + x + "\n";
        output.innerHTML += "y: " + y + "\n";

        output.innerHTML += "start x: " + positionStart.x + "\n";
        output.innerHTML += "start y: " + positionStart.y + "\n";

        //output.innerHTML += "z: " + z + "\n";

        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.left = ((maxX / 2) + (x - positionStart.x) * 6) + "px";
        ball.style.top = ((maxY / 2) + yStep * ((maxY/2)/yLimit)) + "px";

        output.innerHTML += "top: " + ball.style.top + "\n";
        output.innerHTML += "left: " + ball.style.left + "\n";

    }, false);

}