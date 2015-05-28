﻿var loggingProvider = require('../provider/logging.node'),
    main = require("../main.node");

// Constructor
function BaseViewModel(options) {
    loggingProvider.log("BaseViewModel:Constructor");
}

// class methods
var instanceMembers = {
    data: {
        get: function () {
            return this._data;
        },
        set: function (val) {
            console.log("viewModel:data:set");
            this._data = val;
            this.dispatchEvent('data');
            this.onDataSet();
        }
    },
    onDataSet: function () {
        console.log("viewModel:onDataSet");

        // TODO: Catch view load timeouts
        /*windowHelper.setTimeout(function () {
            if (!that._onDataLoadedFlag) {
                var messageService = main.ioc.getService("message");
                messageService.send("NavigateToMessage", {
                    viewKey: "error",
                    errorKey: "view-load-timeout"
                });
            }
        }, config.get("behaviors:viewLoadTimeout"));*/
    }
}

var staticMembers = {

}

// export the class
module.exports = WinJS.Class.define(BaseViewModel, instanceMembers, staticMembers);
WinJS.Class.mix(module.exports, WinJS.Utilities.eventMixin);