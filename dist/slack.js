'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.welcomeMessage = exports.sendMessage = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// const token = process.env.SLACK_API_TOKEN || '';

// const slack = new Slack(token);

var slack = new _slackNode2.default();

slack.setWebhook(process.env.WEBHOOK);

console.log('====================================');
console.log(process.env.WEBHOOK);
console.log('====================================');

var channels = {
    foodcloud: "C64DZ6KQS"
};

var defaultOptions = {
    text: "",
    username: 'Foodcloud-Logs',
    channel: channels.foodcloud,
    icon_emoji: ":chart_with_upwards_trend:"
};

var sendMessage = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var message = _ref2.message;
        var options, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        options = (0, _extends3.default)({}, defaultOptions, { text: message });
                        data = {};


                        console.log('====================================');
                        console.log(options);
                        console.log('====================================');

                        slack.webhook({
                            channel: "#foodcloud-logs",
                            username: "foodcloud-logs",
                            text: message
                        }, function (err, response) {
                            console.log(response);
                            data = response;
                        });

                        _context.next = 8;
                        return data;

                    case 8:
                        return _context.abrupt('return', _context.sent);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function sendMessage(_x) {
        return _ref.apply(this, arguments);
    };
}();

var welcomeMessage = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = {};

                        console.log('====================================');
                        console.log("Welcome!");
                        console.log('====================================');

                        slack.webhook({
                            channel: "#foodcloud-logs",
                            username: "foodcloud-logs",
                            text: "Welcome!"
                        }, function (err, response) {
                            console.log(response);
                            data = response;
                        });

                        _context2.next = 7;
                        return data;

                    case 7:
                        return _context2.abrupt('return', _context2.sent);

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function welcomeMessage() {
        return _ref3.apply(this, arguments);
    };
}();

exports.sendMessage = sendMessage;
exports.welcomeMessage = welcomeMessage;