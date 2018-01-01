var system = require('system');
var args = system.args;
var page = require('webpage').create();
var webUrl = args[1];

page.customHeaders = {
    'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
};

page.open(webUrl, function(status) {
    setTimeout(function() {
        if (status === 'success') {
            var base64 = page.renderBase64('png');
            // console.log(base64);   
            system.stdout.write(base64);
        }
        page.close();
        phantom.exit();
    }, 3000);
});
