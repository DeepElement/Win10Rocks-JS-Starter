var NetworkProvider = function (options) {
};

var members = {
    get: function (path, callback) {
        throw new Error("not-implemented");
    }
};

module.exports = window.Class.define(NetworkProvider, members);