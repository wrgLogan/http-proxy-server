var express = require('express');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
var proxyConfig = require('./proxy.config');
var path = require('path');

var app = express();

var createProxySetting = function(url) {
    return {
        target: url,
        changeOrigin: true,
        headers: {
            'Accept' : 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        onProxyReq: function (proxyReq, req) {
            if (req.method === 'POST' && req.body) {
                var bodyData = JSON.stringify(req.body);
                proxyReq.write(bodyData);
            }
        }
    }
}

app.use(function(req, res, next) {
    console.log(req.url);
    next();
})
// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'app')));
app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

// proxy
proxyConfig.forEach(function (item) {
   app.use(item.url, proxy(createProxySetting(item.target)))
});

app.listen(3000);