var spawn = require('child_process').spawn;
var mplayer = spawn('mplayer', ['-quiet', '-']
    , {stdio: ['pipe', 'ignore', 'ignore']});
module.exports = mplayer;
