var spawn = require('child_process').spawn;
//var mplayer = spawn('mplayer', ['-'], {stdio: [null,1,2]}); // logs

var mplayer = spawn('mplayer', ['-'])
mplayer.on('error', function (err) { console.log(err);});
module.exports = mplayer;
