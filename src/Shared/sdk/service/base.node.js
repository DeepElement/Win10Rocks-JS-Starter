var baseService = function (options) {

}

var members = {
    load: function (done) {
        return done();
    },
    pause: function () {
        return done();
    },
    resume: function () {
        return done();
    },
    unload: function () {
        return done();
    }
}

var staticMembers = {

}

module.exports = WinJS.Class.define(baseService, members, staticMembers);
