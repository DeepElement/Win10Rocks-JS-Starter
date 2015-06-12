var classHelper = require('../helper/class.node');

var _constructor = function(options) {
    this._key = options.key;
    this._address = options.address;
};

var members = {
    key: {
        get: function() {
            return this._key;
        }
    },

    // address of feed
    address: {
        get: function() {
            return this._address;
        }
    }
};


module.exports = classHelper.define(_constructor, members);
