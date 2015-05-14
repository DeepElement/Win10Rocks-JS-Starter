var loggingProvider = require('../provider/logging.node'),
    classHelper = require('../helper/class.node.js');

// Constructor
function SplashViewModel(options) {
    loggingProvider.log("SplashViewModel:created");
}
classHelper.inherits(SplashViewModel, require('./base.node'));

// class methods
SplashViewModel.prototype.customMethod = function () {
    loggingProvider.log("SplashViewModel:CustomMethod called");
};

// export the class
module.exports = SplashViewModel;