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
    _self.canExecute = WinJS.Binding.as({
        value: true
    });
}

// RelayCommand Methods
// ------------------
var relayCommandMethods = {
    execute: null,
    canExecute: null
};

module.exports = WinJS.Class.define(RelayCommand, relayCommandMethods, WinJS.Utilities.eventMixin);
WinJS.Class.mix(module.exports, WinJS.Utilities.createEventProperties("onExecuteCompleted"));