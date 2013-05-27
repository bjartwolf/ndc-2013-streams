// Part One
// *********
var fs = require('fs');
var videoStream = fs.createReadStream('drone.mp4');
//var videoStream = require('./droneVideoStream');

videoStream.pipe(process.stdout);
