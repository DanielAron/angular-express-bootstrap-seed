/*
 * Serve JSON to our AngularJS client
 */

// For stubbing purposes
exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.frauds = function (req, res) {
    callFrauds(function(statusCode, result) {
        // I could work with the result html/json here.  I could also just return it
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        res.statusCode = statusCode;
        res.send(result);
    });
};

var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
var callFrauds = function(onResult)
{

    var options = {
        host: 'localhost',
        port: 9876,
        path: '/frauds',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(response)
    {
        var output = '';
        console.log(options.host + ':' + response.statusCode);
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            output += chunk;
        });

        response.on('end', function() {
            var obj = JSON.parse(output);
            onResult(response.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log("ERROR "  + err.message);
        //res.send('error: ' + err.message);
    });

    req.end();
};