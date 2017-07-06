'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _slack = require('./utils/slack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a server with a host and port
var app = (0, _express2.default)();

app.use((0, _bodyParser2.default)());

var PORT = process.env.PORT || 8000;

app.get('/', function (req, res) {
    res.send("Working!");
});

app.post('/send', function (req, res) {
    var response = (0, _slack.sendMessage)(req.body);
    res.send("sended");
});

app.listen(PORT, function () {
    console.log('====================================');
    console.log("App it's running on Port: ", PORT);
    console.log('====================================');
});