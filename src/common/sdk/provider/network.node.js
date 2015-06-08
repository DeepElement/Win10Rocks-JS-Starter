var classHelper = require('../helper/class.node');

var NetworkProvider = function (options) {
};

var members = {
    get: function (path, callback) {
        throw new Error("not-implemented");
    }
};

module.exports = classHelper.define(NetworkProvider, members);