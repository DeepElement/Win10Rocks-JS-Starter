var classHelper = require('../helper/class.node');

var NavigationProvider = function (options) {
}

var members = {
    navigate: function (viewKey, state) {
        throw new Error("not-implemented");
    }
}

var staticMembers = {

}

module.exports = classHelper.define(NavigationProvider, members, staticMembers)