var loggingProvider = require('../provider/logging.node');

// Constructor
function BaseViewModel(options) {
    loggingProvider.log("BaseViewModel:Constructor");
}
// class methods
var instanceMembers = {
    data: {
        get: function () {
            return this._data;
        },
        set: function (val) {
            this._data = val;
            this.dispatchEvent('data');
        }
    },
    onDataSet: function () {
        loggingProvider.log("BaseViewModel:onDataSet");
    }
}

var staticMembers = {

}

// export the class
module.exports = WinJS.Class.define(BaseViewModel, instanceMembers, staticMembers);
WinJS.Class.mix(module.exports, WinJS.Utilities.eventMixin);