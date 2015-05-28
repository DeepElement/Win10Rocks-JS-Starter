var path = require('path');
exports.resolve = function (path) {
    return require('../src/Common/' + path);
};