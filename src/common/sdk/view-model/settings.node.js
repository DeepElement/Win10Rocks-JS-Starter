var baseViewModel = require('./base.node'),
      relayCommand = require('../command/relay.node'),
      main = require("../main.node"),
      classHelper = require('../helper/class.node');

// Constructor
function SettingsViewModel(options) {
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
                var messageService = main.getComponent("messageService");
                messageService.send("NavigateToMessage", {
                    viewKey: "home"
                });
            });
        }
    }
};

module.exports = classHelper.derive(baseViewModel,
    SettingsViewModel, instanceMembers);