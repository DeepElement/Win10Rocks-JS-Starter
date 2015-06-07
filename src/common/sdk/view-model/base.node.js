var loggingProvider = require('../provider/logging.node'),
    main = require("../main.node");

// Constructor
function BaseViewModel(options) {

}

// class methods
var instanceMembers = {
    data: {
        get: function () {
            return this._data;
        },
        set: function (val) {
            this._data = val;
            this.dispatchEvent('data');
            this.onDataSet();
        }
    },
    onDataSet: function () {
        // TODO: Catch view load timeouts
        /*windowHelper.setTimeout(function () {
            if (!that._onDataLoadedFlag) {
                var messageService = main.ioc.getComponent("messageService");
                messageService.send("NavigateToMessage", {
                    viewKey: "error",
                    errorKey: "view-load-timeout"
                });
            }
        }, config.get("behaviors:viewLoadTimeout"));*/
    }
};

// export the class
module.exports = window.Class.define(BaseViewModel, instanceMembers);
window.Class.mix(module.exports, window.Class.Utilities.eventMixin);