var async = require('async'),
    winJSHelper = require('./helper/winjs.node'),
    windowHelper = require('./helper/window.node'),
    config = require('./helper/config.node'),
    path = require('path');

require('./setup.node');

exports.load = function (done) {
    console.log("Main:load");
    async.waterfall([
         function (cb) {
             // Load Configurations
             var configFiles = [config.get("path:app:baseDir") + "/config/config.app.json",
             config.get("path:app:baseDir") + "/config/config." + config.get("configuration") + ".json"];
             async.eachSeries(configFiles,
                 function (item, itemCb) {
                     config.file(item, itemCb);
                 },
                 function (err) {
                     console.log(err);
                     return cb(err);
                 });
         }
    ],
    function (err) {
        if (err)
            return done(err);

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