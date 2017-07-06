'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMessage = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slackNode = require('slack-node');

var _slackNode2 = _interopRequireDefault(_slackNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = process.env.SLACK_API_TOKEN || '';

var slack = new _slackNode2.default(token);

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
        var type = _ref2.type,
            message = _ref2.message;
        var options, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        options = (0, _extends3.default)({}, defaultOptions, { text: "" + type + "\n```" + message + "```" });
                        data = {};

                        slack.api('chat.postMessage', options, function (err, response) {
                            data = response;
                        });

                        _context.next = 5;
                        return data;

                    case 5:
                        return _context.abrupt('return', _context.sent);

                    case 6:
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

exports.sendMessage = sendMessage;