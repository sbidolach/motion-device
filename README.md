# Motion Device Event
This project describe how use motion sensor on mobile device to control object in HTML
- Live demo (run on mobile device) - [http://sbidolach.github.io/motion-device/](http://sbidolach.github.io/motion-device/)
- JavaScript file - [http://sbidolach.github.io/motion-device/js/motion-device.js](http://sbidolach.github.io/motion-device/js/motion-device.js)

# Quick installation and start
- Run below installation script

```bash
# Install nodejs
sudo apt-get update && sudo apt-get upgrade
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Grunt Command Line Interface
sudo npm install -g grunt-cli

# Clone project MotionDeviceEvent and install dependencies
git clone https://github.com/sbidolach/motion-device.git
cd motion-device
npm install

# Run MotionDeviceEvent
grunt start
```

- Open in mobile browser the below URL (Mobile phone and raspberry have to be in this same network)

```
http://[ip_address]:8899
```

# Install application on mobile phone
- Open chrome borwser with url `http://[ip_address]:8899`
- Open chrome menu (right top corner)
- Select option `Add to home screen`
- Add application title `MotionDeviceEvent`
- The shortcut should be added to home screen

# Usage
Import library into your project :

```html
<script src="http://sbidolach.github.io/motion-device/js/motion-device.js"></script>
<script>
    var manager = motionDevice.create(options);
</script>
```

# Options
You can configure your motion device (all options are optional) :

```js
var options = {
    limit_x: Number,                // sensitive for axis x [max 180]
    limit_y: Number                 // sensitive for axis y [max 90]
};
```

## Example:

```html
<script>
    var manager = motionDevice.create({
        limit_x: 15.5,
        limit_y: 25.5
    });
</script>
```

# API
Manager has the following signature :

```js
{
    on: Function,                       // handle internal event
    off: Function,                      // un-handle internal event
    options: {
        limit_x: Number,                // sensitive for axis x [max 180]
        limit_y: Number                 // sensitive for axis y [max 90]
    }
}
```

## `manager.on(type, handler)`
Listener for internal events :

```js
manager.on('event#1', function (evt, data) {
    // Do something.
});
```

Note that you can listen to multiple events at once by separating them either with a space or a comma (or both, I don't care).

## `manager.off([type, handler])`
To remove an event handler :

```js
manager.off('event', handler);
```

If you call off without arguments, all handlers will be removed. If you don't specify the handler but just a type, all handlers for that type will be removed.

# Event
## `move`
When device is moved then listener return the below data :

```js
{
    limit: {                // event bounds for axis x and y
        up: 65.5,
        down: 14.4,
        left: -15.8,
        rght: 15.1
    },
    start: {                // start position for axis x and y
        x: -0.38,
        y: 39.97
    },
    event: {                // data from axis x and y
        x: -0.38,
        y: 39.97
    },
    middle: {               // middle point for event bounds
        x: 179.61,
        y: -50.02
    },
    step: {                 //  steps between start points and event bounds
        x: 0,
        y: 0
    }
}
```

### Example `move` event

```html
<script>
    motionDevice.create({
        limit_x: 15.5,
        limit_y: 25.5
    }).on('move', function(evt, data) {
        console.log(data);
    });
</script>
```
