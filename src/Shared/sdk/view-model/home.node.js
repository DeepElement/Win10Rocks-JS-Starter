var loggingProvider = require('../provider/logging.node'),
    classHelper = require('../helper/class.node.js');

// Constructor
function HomeViewModel(options) {
    loggingProvider.log("HomeViewModel:created");
}
classHelper.inherits(HomeViewModel, require('./base.node'));

// class methods
HomeViewModel.prototype.customMethod = function () {
    loggingProvider.log("HomeViewModel:CustomMethod called");
};

// export the class
module.exports = HomeViewModel;