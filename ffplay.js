var spawn = require('child_process').spawn;
var ffplay = spawn('ffplay', [
//    '-f', 'h264',
//    '-analyzeduration', '0',
    '-autoexit',
    '-'
//    '-i', '-'
  ], {stdio: ['pipe', 'ignore', 'ignore']}
);

module.exports = ffplay;
