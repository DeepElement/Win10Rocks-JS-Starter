var classHelper = require('../helper/class.node'),
    utilityHelper = require('../helper/utilities.node');

// RelayCommand Constructor
// ----------------------
function RelayCommand(payload, key) {
    var _self = this;
    _self._key = key;
    _self._internalExecute = payload || function () { };
    _self.execute = function () {
        return _self._internalExecute.apply(_self, arguments);
    };
    WinJS.Utilities.markSupportedForProcessing(_self.execute);
    _self.canExecute = true;
}

// RelayCommand Methods
// ------------------
var relayCommandMethods = {
    execute: null,
    canExecute: null
};

module.exports = classHelper.define(RelayCommand, relayCommandMethods);
classHelper.mix(module.exports, utilityHelper.eventMixin);
classHelper.mix(module.exports, utilityHelper.createEventProperties("onExecuteCompleted"));