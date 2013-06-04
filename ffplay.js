var spawn = require('child_process').spawn;
var ffplay = spawn('ffplay', [
    '-analyzeduration', '0',
    '-autoexit',
    '-'
  ], {stdio: ['pipe', 'ignore', 'ignore']}
);

module.exports = ffplay;
