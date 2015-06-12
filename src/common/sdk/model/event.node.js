var classHelper = require('../helper/class.node');

var _constructor = function(options) {
    this._key = options.key;
    this._name = options.name;
    this._feedSource = options.feedSource;
};

var members = {
    key: {
        get: function() {
            return this._key;
        }
    },
    name: {
        get: function() {
            return this._name;
        }
    },
    feedSource: {
        get: function() {
            return this._feedSource;
        }
    }
};

module.exports = classHelper.define(_constructor, members);
