var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');

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

    childProcess.exec(
        `phantomjs ${path.resolve(__dirname, 'phantom-capture.js')} ${webUrl}`,
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
};
