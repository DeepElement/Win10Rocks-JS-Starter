var loggingProvider = require('../provider/logging.node');

// Constructor
function HomeViewModel(options) {
    loggingProvider.log("HomeViewModel:created");
}

var instanceMembers = {

};

var staticMembers = {

};

module.exports = WinJS.Class.derive(require('./base.node'),
    HomeViewModel, instanceMembers, staticMembers);