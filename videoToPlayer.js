var fs = require('fs');
var videoStream = fs.createReadStream('ytdl.mp4');
//var videoStream = require('./droneVideoStream'); 
var player = require('./ffplay'); 
videoStream.pipe(player.stdin);
