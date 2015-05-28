var classHelper = require('../helper/class.node');

var baseService = function (options) {

}

var members = {
    load: function (done) {
        return done();
    },
    pause: function (done) {
        return done();
    },
    resume: function (done) {
        return done();
    },
    unload: function (done) {
        return done();
    }
}

var staticMembers = {

}

module.exports = classHelper.define(baseService, members, staticMembers);
WinJS.Class.mix(module.exports, WinJS.Utilities.eventMixin);
