var loggingProvider = require('../provider/logging.node'),
    baseViewModel = require('./base.node'),
    windowHelper = require('../helper/window.node');

// Constructor
function SplashViewModel(options) {
    loggingProvider.log("HomeViewModel:created");
}

var instanceMembers = {
    onDataSet: function () {
        var that = this;
        baseViewModel.prototype.onDataSet.call(this, arguments);

        // Simulate load
        windowHelper.setTimeout(function () {
            that.dispatchEvent('loaded');
        }, 10000);
    }
};

var staticMembers = {

};

module.exports = WinJS.Class.derive(baseViewModel,
    SplashViewModel, instanceMembers, staticMembers);