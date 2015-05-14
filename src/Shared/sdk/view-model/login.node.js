var baseViewModel = require('./base.node.js');

// Constructor
function LoginViewModel(options) {
    // always initialize all instance properties
    baseViewModel.apply(this, Array.prototype.slice.call(arguments));
}
LoginViewModel.prototype = new baseViewModel();

// class methods
LoginViewModel.prototype.customMethod = function () {
    baseViewModel.prototype.customMethod.call(this, Array.prototype.slice.call(arguments));
};

// export the class
module.exports = LoginViewModel;