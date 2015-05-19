var loggingProvider = require('../provider/logging.node');

// Constructor
function SettingsViewModel(options) {
    loggingProvider.log("SettingsViewModel:created");
}

var instanceMembers = {

};

var staticMembers = {

};

module.exports = WinJS.Class.derive(require('./base.node'),
    SettingsViewModel, instanceMembers, staticMembers);