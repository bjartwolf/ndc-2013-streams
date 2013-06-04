var fs = require('fs');

//var videoStream = fs.createReadStream('ytdl.mp4');
//var videoStream = require('./droneVideoStream'); 
var videoStream = require('./httpMovieStream'); 

var player = require('./ffplay'); 
videoStream.pipe(player.stdin);

