﻿var main = require('../main.node'),
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
            var navigationProvider = main.getComponent("navigationProvider");
            navigationProvider.navigate(viewKey, args.state);
        }
    },

    onNavigatedMessage: function (messageType, args) {
        args.viewModel.data = args.state;
    },

    onNavigatingMessage: function (messageType, args) {
    }
}


module.exports = window.Class.derive(base, navigationService, members);
