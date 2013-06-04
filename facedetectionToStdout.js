// Detecting faces 
// ***************
var fs = require('fs');
var player = require('./ffplay'); 
var videoStream = fs.createReadStream('ytdl.mp4');
videoStream.pipe(player.stdin);

// Detect faces 
var faceDetector = require('./FaceDetectionStream');
videoStream.pipe(faceDetector.stdin);

// Faces are JSON, must be serialized first
var Serializer = require('./serializer.js');
faceDetector.stdout.pipe(new Serializer()).pipe(process.stdout);
