var classHelper = require('../helper/class.node');

var _constructor = function(options) {
    this._key = options.key;
    this._name = options.name;
    this._contentType = options.contentType;
    this._contributors = options.contributors;
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
    contentType: {
        get: function() {
            return this._contentType;
        }
    },

    // Keys of contributors
    contributors: {
        get: function() {
            return this._contributors;
        }
    }
};

module.exports = classHelper.define(_constructor, members);
