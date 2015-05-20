var classHelper = require('../helper/class.node');

var navigationService = function (options) {
    this._contextStack = [];
}

var members = {
    getViewModelFromUri: function (uri) {
        // TODO: recover View Model instance
        return null;
    },

    navigate: function (uri) {
        // TODO: navigate to URI
    },

    currentContext: {
        get: function () {
            if (this._contextStack && this._contextStack.length > 0)
                return this._contextStack.peek();
            return null;
        }
    }
}

var staticMembers = {

}

module.exports = classHelper.derive(require('./base.node'), navigationService, members, staticMembers);
