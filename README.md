# Motion Device Event

This project describe how use motion sensor on mobile device to control object in HTML

Live demo (run on mobile device) - http://sbidolach.github.io/motion-device/

# Quick installation and start

* Run below installation script

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

* Open in mobile browser the below URL (Mobile phone and raspberry have to be in this same network)

```
http://[ip_address]:8899
```

# Install application on mobile phone

* Open chrome borwser with url `http://[ip_address]:8899`
* Open chrome menu (right top corner)
* Select option `Add to home screen`
* Add application title `MotionDeviceEvent`
* The shortcut should be added to home screen
