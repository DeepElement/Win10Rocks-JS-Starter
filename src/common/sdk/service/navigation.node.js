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
        console.log("navigationService:onNavigateToMessage:" + viewKey);
        if (viewKey) {
            viewKey = viewKey.toLowerCase();
            var navigationProvider = main.getComponent("navigationProvider");
            console.log(navigationProvider);
            navigationProvider.navigate(viewKey, args.state);
        }
    },

    onNavigatedMessage: function (messageType, args) {
        args.viewModel.data = args.state;
    },

    onNavigatingMessage: function (messageType, args) {
    }
}

var staticMembers = {

}

module.exports = classHelper.derive(base, navigationService, members, staticMembers);
