var classHelper = require('../helper/class.node'),
    main = require('../main.node'),
    base = require('./base.node');

var navigationService = function (options) {

}

var members = {
    load: function (done) {
        var that = this;
        base.prototype.load.call(this, function () {
            return done();
        });
    },

    unload: function (done) {
        return done();
    },

    onNavigateToMessage: function (messageType, args) {
        var viewKey = args.viewKey || null;
        if (viewKey) {
            viewKey = viewKey.toLowerCase();
            WinJS.Navigation.navigate("/view/" + viewKey + "/" + viewKey + ".html", args.state);
        }
    },

    onNavigatedMessage: function (messageType, args) {
        console.log({
            type: "onNavigated",
            args: args
        });
        args.viewModel.data = args.state;
    },

    onNavigatingMessage: function (messageType, args) {
        console.log({
            type: "onNavigating",
            args: args
        });
    }
}

var staticMembers = {

}

module.exports = classHelper.derive(base, navigationService, members, staticMembers);
