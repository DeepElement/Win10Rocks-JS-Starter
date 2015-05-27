var async = require('async'),
    winJSHelper = require('./helper/winjs.node'),
    config = require('./helper/config.node');

require('./setup.node');

exports.load = function (done) {
    console.log("Main:load");
    var BUILD_ENV = window.process.env["BUILD_ENV"] || "development";
    config.file("config." + BUILD_ENV + ".json",
        function () {
            winJSHelper.registerBindingMode();

            async.each(exports.getServices(),
                function (item, itemCb) {
                    item.load(itemCb);
                },
                function (err) {
                    return done(err);
                });
        });
}

exports.unload = function (done) {
    console.log("Main:unload");

    async.each(exports.getServices(),
        function (item, itemCb) {
            item.unload(itemCb);
        },
        function (err) {
            return done(err);
        });
}

exports.pause = function (done) {
    console.log("Main:pause");

    async.each(exports.getServices(),
    function (item, itemCb) {
        item.pause(itemCb);
    },
    done);
}

exports.resume = function (done) {
    console.log("Main:resume");

    async.each(exports.getServices(),
        function (item, itemCb) {
            item.resume(itemCb);
        },
        done);
}

exports.ioc = require('./helper/ioc.node');

exports.getServices = function () {
    return [
        exports.ioc.get(require('./service/message.node')),
        exports.ioc.get(require('./service/navigation.node'))
    ];
}

exports.getService = function (name) {
    if (MetroNode.sdk.service[name]) {
        return exports.ioc.get(MetroNode.sdk.service[name]);
    }
    return null;
}