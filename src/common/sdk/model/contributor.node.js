var classHelper = require('../helper/class.node');

var _constructor = function(options) {
    this._key = options.key ;
    this._name = options.name;
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
    }
};

module.exports = classHelper.define(_constructor, members);
