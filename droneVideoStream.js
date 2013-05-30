var net = require('net');
var PaVEParser = require('./node_modules/ar-drone/lib/video/PaVEParser');
var SelectStream = require('./SelectStream');
var parser = new PaVEParser();
var payload = new SelectStream('payload');
var stream = require('stream');
var outStream = new stream.PassThrough();

var socket = net.connect({ host: '192.168.1.1', port: 5555});
socket.pipe(parser).pipe(payload).pipe(outStream);
outStream.pipe(process.stdout);
module.exports = outStream;
