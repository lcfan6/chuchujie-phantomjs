var system = require('system');
var args = system.args;
var page = require('webpage').create();
var webUrl = args[1];

page.customHeaders = {
    'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
};

page.open(webUrl, function(status) {
    if (status !== 'success') {
        phantom.exit(1);
    } else {
        var t = window.setInterval(function() {
            if (window.document.readyState === 'complete') {
                window.clearInterval(t);
                var base64 = page.renderBase64('png');
                system.stdout.write(base64);
                phantom.exit();
            }
        }, 10);
    }
});
