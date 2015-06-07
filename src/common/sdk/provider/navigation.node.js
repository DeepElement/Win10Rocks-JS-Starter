var NavigationProvider = function (options) {
}

var members = {
    navigate: function (viewKey, state) {
        throw new Error("not-implemented");
    }
};

module.exports = window.Class.define(NavigationProvider, members);