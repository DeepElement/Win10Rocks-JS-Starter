var async = require('async');

require('./helper/runtime.node');
require('./setup.node');

exports.load = function (done) {
    console.log("Main:load");

    async.each(exports.getAllServices(),
        function (item, itemCb) {
            item.load(itemCb);
        },
        done);
}

exports.unload = function (done) {
    console.log("Main:unload");

    async.each(exports.getAllServices(),
        function (item, itemCb) {
            item.unload(itemCb);
        },
        done);
}

exports.pause = function (done) {
    console.log("Main:pause");

    async.each(exports.getAllServices(),
    function (item, itemCb) {
        item.pause(itemCb);
    },
    done);
}

exports.resume = function (done) {
    console.log("Main:resume");

    async.each(exports.getAllServices(),
        function (item, itemCb) {
            item.resume(itemCb);
        },
        done);
}

exports.ioc = require('./helper/ioc.node');

exports.getAllServices = function () {
    return [
        exports.ioc.get(MetroNode.sdk.service.message),
        exports.ioc.get(MetroNode.sdk.service.navigation)
    ];
}