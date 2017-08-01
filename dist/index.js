'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _slack = require('./slack');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// Create a server with a host and port
var app = (0, _express2.default)();

app.use((0, _bodyParser2.default)());

var PORT = process.env.PORT || 8000;

var API_KEY = process.env.API_KEY;

var SECRET_API_KEY = process.env.SECRET_API_KEY;

var userAuth = function userAuth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {

        _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
            if (err) return res.json({ success: false, message: 'Failed to authenticate token.' });

            req.decoded = decoded;
            console.log('====================================');
            console.log(decoded);
            console.log('====================================');
            next();
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

app.get('/', function (req, res) {
    res.send({
        message: 'Working!',
        state: process.version
    });
});

app.get('/generate-token/:msg/:API_KEY/:SECRET_API_KEY', function (req, res) {
    console.log('====================================');
    console.log(req.params);
    console.log(process.env.API_KEY);
    console.log('====================================');
    if (req.params.API_KEY == API_KEY && req.params.SECRET_API_KEY == SECRET_API_KEY) {
        var token = _jsonwebtoken2.default.sign({ auth: true }, _config2.default.secret);
        if (req.params.msg) (0, _slack.welcomeMessage)();
        res.send(token);
    } else {
        res.send("User not allow!");
    }
});

app.post('/send', userAuth, function (req, res) {
    var response = (0, _slack.sendMessage)(req.body);
    res.send("sended");
});

app.listen(PORT, function () {
    console.log('====================================');
    console.log("App it's running on Port: ", PORT);
    console.log('====================================');
});