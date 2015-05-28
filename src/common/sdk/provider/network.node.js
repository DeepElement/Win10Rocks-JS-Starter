var classHelper = require('../helper/class.node');

var NetworkProvider = function (options) {
}

var members = {
    get: function (path, callback) {
        throw new Error("not-implemented");
    }
}

var staticMembers = {

}

module.exports = classHelper.define(NetworkProvider, members, staticMembers)