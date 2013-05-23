var net = require('net');
var PaVEParser = require('./node_modules/ar-drone/lib/video/PaVEParser');
var SelectStream = require('./SelectStream');
var parser = new PaVEParser();
var payload = new SelectStream('payload');
var socket = net.connect({ host: '192.168.1.1', port: 5555});
var outStream = new stream.PassThrough();

socket.pipe(parser).pipe(payload).pipe(outStream);

module.exports = outStream;
