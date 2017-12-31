var http = require('http');
var url = require('url');
var express = require('express');
// var formidable = require('formidable');
var nodeCallPhantom = require('./capturePackage/node-call-phantom');

var app = express();

app.get('/api/capture', function(req, res) {
    var query = url.parse(req.url, true).query;
    var type = query.encoding;
    var webUrl = query.url;
    nodeCallPhantom(webUrl, function(err, img) {
        if (err) {
            console.log(err);
        }
        if (type === 'base64') {
            var reply = {
                error: 0,
                data: {
                    img: ''
                }
            };
            if (err) {
                reply.error = 1;
                res.send(reply);
                return;
            }
            img = 'data:image/png;base64,' + img.toString('base64');
            reply.data.img = img;
            res.send(reply);
            return;
        }
        if (err) {
            res.status(404).end();
        }
        res.send(img);
    });
});

http.createServer(app).listen(process.env.PORT || 3000);
