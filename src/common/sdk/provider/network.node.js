var classHelper = require('../helper/class.node'),
    request = require('request');

var _constructor = function (options) {
};

var members = {
    get: function (path, callback) {
        request(path, function (error, response, body) {
            if(!error && response.statusCode != 200)
                return callback(error);
            return callback(null, response);
        });
    }
};

module.exports = classHelper.define(_constructor, members);