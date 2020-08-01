const http = require('http');

exports.getUserList = function (req, res) {
    res.json("Test string");
}

exports.getUserApi = function (req, response) {
    var options = {
        host: 'localhost',
        port: 88,
        path: '/WebApiCore/api/equity_investment/get',
        method: 'GET'
    };

    http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('uft8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            response.json(JSON.parse(chunk));
        })
    }).end();
}