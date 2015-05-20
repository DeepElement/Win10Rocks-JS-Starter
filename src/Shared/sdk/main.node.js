var async = require('async');

require('./helper/runtime.node');
require('./setup.node');

exports.load = function (done) {
    console.log("Main:load");
    var services = [
        exports.ioc.get(require('./service/navigation.node')),
        exports.ioc.get(require('./service/message.node'))
    ];

    async.each(services,
        function (item, itemCb) {
            item.load(itemCb);
        },
        done);
}

exports.unload = function (done) {
    console.log("Main:unload");
    return done();
}

exports.pause = function (done) {
    console.log("Main:pause");
    return done();
}

exports.resume = function (done) {
    console.log("Main:resume");
    return done();
}

exports.ioc = require('./helper/ioc.node');