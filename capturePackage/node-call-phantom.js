var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

module.exports = function(webUrl, cb) {
    if (typeof cb !== 'function') {
        throw new Error('node-call-phantom require a callback function');
    }
    if (!webUrl) {
        cb(new Error('url is required'));
        return;
    }
    if (!/^\w+:\/\//.test(webUrl)) {
        webUrl = 'http://' + webUrl;
    }
    var childArgs = [path.resolve(__dirname, 'phantom-capture.js'), webUrl];

    childProcess.execFile(
        binPath,
        childArgs,
        { timeout: 10000, maxBuffer: 10 * 1024 * 1024 },
        function(err, stdout, stderr) {
            if (err) {
                cb(err);
                return;
            }
            var img = Buffer.from(stdout, 'base64');
            cb(null, img);
            // var f = fs.createWriteStream(
            //     path.resolve(
            //         __dirname,
            //         '..',
            //         'imgs',
            //         Math.random()
            //             .toString(32)
            //             .substr(2)
            //     ) + '.png'
            // );
            // f.write(img);
        }
    );
};
