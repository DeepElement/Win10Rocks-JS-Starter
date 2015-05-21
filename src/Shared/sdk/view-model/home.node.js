var loggingProvider = require('../provider/logging.node'),
    baseViewModel = require('./base.node'),
    relayCommand = require('../command/relay.node'),
    main = require("../main.node");

// Constructor
function HomeViewModel(options) {
    loggingProvider.log("HomeViewModel:created");
}

var instanceMembers = {
    onDataSet: function () {
        baseViewModel.prototype.onDataSet.call(this, arguments);
        this.dispatchEvent('loaded');
    },
    navigateToSettingsCommand: {
        get: function () {
            var that = this;
            return new relayCommand(function () {
                var messageService = main.getService("message");
                messageService.send("NavigateToMessage", {
                    viewKey: "settings"
                });
            });
        }
    }
};

var staticMembers = {

};

module.exports = WinJS.Class.derive(baseViewModel,
    HomeViewModel, instanceMembers, staticMembers);