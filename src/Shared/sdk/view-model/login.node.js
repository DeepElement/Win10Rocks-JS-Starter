var loggingProvider = require('../provider/logging.node');

// Constructor
function LoginViewModel(options) {
    loggingProvider.log("HomeViewModel:created");
}

var instanceMembers = {

};

var staticMembers = {

};

module.exports = WinJS.Class.derive(require('./base.node'),
    LoginViewModel, instanceMembers, staticMembers);