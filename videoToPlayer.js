// Part One
// *********
var fs = require('fs');
var player = require('./ffplay'); 
var videoStream = fs.createReadStream('ytdl.mp4');
//var videoStream = require('./httpMovieStream'); 
//var videoStream = require('./droneVideoStream');
videoStream.pipe(player.stdin);
