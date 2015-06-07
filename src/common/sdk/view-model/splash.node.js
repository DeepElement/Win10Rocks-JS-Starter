﻿var loggingProvider = require('../provider/logging.node'),
    baseViewModel = require('./base.node'),
    main = require("../main.node"),
    windowHelper = require('../helper/window.node');

// Constructor
function SplashViewModel(options) {

}

var instanceMembers = {
    onDataSet: function () {
        var that = this;
        baseViewModel.prototype.onDataSet.call(this, arguments);

        that.dispatchEvent('loaded');

        // Simulate load
        windowHelper.setTimeout(function () {
            main.getComponent("messageService").send("NavigateToMessage", {
                viewKey: "home"
            });
        }, 10000);
    }
};

module.exports = window.Class.derive(baseViewModel,
    SplashViewModel, instanceMembers);