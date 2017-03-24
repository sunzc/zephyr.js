// Copyright (c) 2016-2017, Intel Corporation.

// Test code to use the Gyroscope (subclass of Generic Sensor) API
// to communicate with the BMI160 inertia sensor on the Arduino 101
// and monitor the rate of rotation around the the X, Y and Z axis
console.log("Gyroscope test...");

var updateFrequency = 20 // maximum is 100Hz, but in ashell maximum is 20Hz

var sensor = new Gyroscope({
    frequency: updateFrequency
});

sensor.onchange = function() {
    console.log("rotation (rad/s): " +
                " x=" + sensor.x +
                " y=" + sensor.y +
                " z=" + sensor.z);
};

sensor.onstatechange = function(event) {
    console.log("state: " + event);
};

sensor.onerror = function(event) {
    console.log("error: " + event.error.name +
                " - " + event.error.message);
};

sensor.start();
