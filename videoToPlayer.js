// Part One
// *********
var fs = require('fs');
var player = require('./ffplay'); 
var videoStream = fs.createReadStream('drone.mp4');
//var videoStream = require('./droneVideoStream');

videoStream.pipe(player.stdin);
