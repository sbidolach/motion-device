// Singleton class
var motionDevice = (function() {

    var INSTANCE;

    return {
        create: function(window, options) {
            if (!INSTANCE) {
                INSTANCE = new MotionDevice(window, options);
            }
            return INSTANCE;
        }
    };

}());
