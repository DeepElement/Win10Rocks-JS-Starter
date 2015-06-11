var classHelper = require('../helper/class.node'),
    utilityHelper = require('../helper/utilities.node');

var _constructor = function (options) {

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

module.exports = classHelper.define(_constructor, members);
classHelper.mix(module.exports, utilityHelper.eventMixin);
classHelper.mix(module.exports, utilityHelper.timerMixin);