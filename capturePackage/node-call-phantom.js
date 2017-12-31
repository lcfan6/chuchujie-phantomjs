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
    // var childArgs = [path.resolve(__dirname, 'phantom-capture.js'), webUrl];

    childProcess.exec(
        `${binPath} ${path.resolve(__dirname, 'phantom-capture.js')} ${webUrl}`,
        { timeout: 20000, maxBuffer: 10 * 1024 * 1024 },
        function(err, stdout, stderr) {
            if (err) {
                cb(err);
                return;
            }
            var img = Buffer.from(stdout, 'base64');
            cb(null, img);
        }
    );

    // childProcess.execFile(
    //     binPath,
    //     childArgs,
    //     { timeout: 20000, maxBuffer: 10 * 1024 * 1024 },
    //     function(err, stdout, stderr) {
    //         if (err) {
    //             cb(err);
    //             return;
    //         }
    //         var img = Buffer.from(stdout, 'base64');
    //         cb(null, img);
    //     }
    // );
};
