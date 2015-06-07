// RelayCommand Constructor
// ----------------------
function RelayCommand(payload, key) {
    var _self = this;
    _self._key = key;
    _self._internalExecute = payload || function () { };
    _self.execute = function () {
        return _self._internalExecute.apply(_self, arguments);
    };
    _self.execute.supportedForProcessing = true;
    _self.canExecute = true;
}

// RelayCommand Methods
// ------------------
var relayCommandMethods = {
    execute: null,
    canExecute: null
};

module.exports = window.Class.define(RelayCommand, relayCommandMethods);
window.Class.mix(module.exports, WinJS.Utilities.eventMixin);
window.Class.mix(module.exports, WinJS.Utilities.createEventProperties("onExecuteCompleted"));