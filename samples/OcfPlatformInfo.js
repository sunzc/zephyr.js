// Copyright (c) 2016-2017, Intel Corporation.

// Sample server that works with the linux server found in iotivity-constrained
// This sample will find the resource and retrieve its platform info

// To run it on the Arduino 101, you'll need to connect via BLE with your
// host machine (e.g. Linux), then add a new route for the bt0 interface:

// ip -6 route add 2001:db8::/64 dev bt0

var ocf = require('ocf');
var client = ocf.client;

console.log("Started OCF client");

client.on('platformfound', function(platform) {
    console.log("Platform found:");
    console.log("    id: " + platform.id);
    console.log("    Manufacturer Name: " + platform.manufacturerName);
});

client.on('error', function(error) {
  if (error.deviceId)
    console.log("Error for device: " + error.deviceId);
});

function onfound(resource) {
    console.log("Resource found: path=" + resource.resourcePath + " id=" + resource.deviceId);

    client.getPlatformInfo(resource.deviceId).then(function(info) {
        console.log("Got platform info for: " + info.id);
    }, function(error) {
        console.log("Error getting platform info: " + error.name);
    });
}

ocf.start();

client.findResources({ resourceType:"core.light" }, onfound).then(function(resource) {
    console.log("findResources() was successful, deviceId=" + resource.deviceId);
}, function(error) {
    console.log("findResources() returned an error: " + error.name);
});
