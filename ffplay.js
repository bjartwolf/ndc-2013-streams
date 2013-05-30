var spawn = require('child_process').spawn;
var ffplay = spawn('ffplay', [
//    '-f', 'h264',
//    '-analyzeduration', '0',
    '-autoexit',
    '-'
//    '-i', '-'
  ]
);
ffplay.on('error', function (err) { console.log(err);});
module.exports = ffplay;
