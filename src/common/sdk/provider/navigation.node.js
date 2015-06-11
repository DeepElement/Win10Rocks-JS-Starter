var classHelper = require('../helper/class.node');

var _constructor = function (options) {
};

var members = {
    navigate: function (viewKey, state) {
        throw new Error("not-implemented");
    },
    definePage: function (template, viewDef) {
        throw new Error("not-implemented");
    }
};

module.exports = classHelper.define(_constructor, members);