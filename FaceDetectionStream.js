var RGBA = require('./RGBAStream');
var FrameStream = require('./FrameStream');
var frame = new FrameStream();
var FaceStream = require('./FaceStream');
var face = new FaceStream();
var stream = require('stream');
var inStream = new stream.PassThrough();

inStream.pipe(RGBA.stdin);
RGBA.stdout.pipe(frame).pipe(face);

exports.stdin = inStream; 
exports.stdout = face;
