var classHelper = require('../helper/class.node'),
    utilityHelper = require('../helper/utilities.node');

var baseService = function (options) {

};

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

module.exports = classHelper.define(baseService, members);
classHelper.mix(module.exports, utilityHelper.eventMixin);
