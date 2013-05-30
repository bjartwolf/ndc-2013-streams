// Write video to file
var fs = require('fs');
var videoOutStream = fs.createWriteStream('droneVideo.mp4');
var videoStream = require('./droneVideoStream');
videoStream.pipe(videoOutStream);

