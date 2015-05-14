var loggingProvider = require('../provider/logging.node');

// Constructor
function BaseViewModel(options) {
    loggingProvider.log("BaseViewModel:Constructor");
}
// class methods
BaseViewModel.prototype.onDataSet = function () {
    loggingProvider.log("BaseViewModel:onDataSet");
};

// export the class
module.exports = BaseViewModel;