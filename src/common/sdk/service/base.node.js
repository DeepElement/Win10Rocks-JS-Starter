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
};

module.exports = window.Class.define(baseService, members);
window.Class.mix(module.exports, WinJS.Utilities.eventMixin);
