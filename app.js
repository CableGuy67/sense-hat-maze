var SenseHat = require('node-sense-hat');

var joystickLib = SenseHat.Joystick;
var matrix = SenseHat.Leds;
var imuLib = SenseHat.Imu;

var imu = new imuLib.IMU();

var currentLocation = [0, 1];
var backgroundColour = [0, 0, 0];
var MINx = 0,
    MAXx = 6,
    MINy = 1,
    MAXy = 7;

joystickLib.getJoystick()
.then(function(joystick) {

	joystick.on('press', function(direction) {

		console.log('The joystick was pressed in the ' + direction + ' direction');

		switch(direction) {
			case 'up':
				currentLocation[1]--;
				if(currentLocation[1] < MINy) currentLocation[1] = MINy;
				break;
			case 'down':
				currentLocation[1]++;
				if(currentLocation[1] > MAXy) currentLocation[1] = MAXy;
				break;
			case 'left':
				currentLocation[0]--;
				if(currentLocation[0] < MINx) currentLocation[0] = MAXx;
				break;
			case 'right':
				currentLocation[0]++;
				if(currentLocation[0] > MAXx) currentLocation[0] = MINx;
				break;
		}

	});

});

setInterval(function() {

	imu.getValue(function(error, data) {

		backgroundColour = [
			127 * data.accel.x,
			127 * data.accel.y,
			127 * data.accel.z
		].map(function(value) {
			if (value < 0) return 0;
			if (value > 255) return 255;
			return Math.floor(value);
		});

	});
}, 1000);

setInterval(function() {
	matrix.clear(backgroundColour);
	matrix.setPixel(currentLocation[0], currentLocation[1], [255, 0, 0]);
}, 100);
