var loggingProvider = require('../provider/logging.node');

// Constructor
function HomeViewModel(options) {
    loggingProvider.log("HomeViewModel:created");
}

var instanceMembers = {
    onDataSet: function () {
        this.dispatchEvent('loaded');
    }
};

var staticMembers = {

};

module.exports = WinJS.Class.derive(require('./base.node'),
    HomeViewModel, instanceMembers, staticMembers);