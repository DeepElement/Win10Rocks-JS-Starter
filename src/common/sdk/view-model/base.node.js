var main = require("../main.node"),
    classHelper = require('../helper/class.node'),
    utilityHelper = require('../helper/utilities.node');

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
module.exports = classHelper.define(BaseViewModel, instanceMembers);
classHelper.mix(module.exports, utilityHelper.eventMixin);
classHelper.mix(module.exports, utilityHelper.timerMixin);