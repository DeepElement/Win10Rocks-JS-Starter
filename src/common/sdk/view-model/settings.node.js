var loggingProvider = require('../provider/logging.node'),
      baseViewModel = require('./base.node'),
      relayCommand = require('../command/relay.node'),
      main = require("../main.node");

// Constructor
function SettingsViewModel(options) {
    loggingProvider.log("SettingsViewModel:created");
}

var instanceMembers = {
    onDataSet: function () {
        baseViewModel.prototype.onDataSet.call(this, arguments);

        this.dispatchEvent('loaded');
    },
    navigateToHomeCommand: {
        get: function () {
            var that = this;
            return new relayCommand(function () {
                var messageService = main.getService("message");
                messageService.send("NavigateToMessage", {
                    viewKey: "home"
                });
            });
        }
    }
};

var staticMembers = {

};

module.exports = WinJS.Class.derive(baseViewModel,
    SettingsViewModel, instanceMembers, staticMembers);