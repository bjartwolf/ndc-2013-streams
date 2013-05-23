var spawn = require('child_process').spawn;
var ffplay = spawn('ffplay', [
    '-autoexit',
    '-i', '-'
  ]
);
ffplay.on('error', function (err) { console.log(err);});
module.exports = ffplay;
