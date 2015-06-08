var async = require('async'),
    windowHelper = require('./helper/window.node'),
    config = require('./helper/config.node'),
    path = require('path'),
    ioc = require('./helper/ioc.node');

require('./runtime.node');
require('./setup.node');

exports.load = function (done) {
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
                     return cb(err);
                 });
         }
    ],
    function (err) {
        if (err)
            return done(err);

        async.each(exports.getServices(),
            function (item, itemCb) {
                item.load(itemCb);
            },
            function (err) {
                if (err)
                    return done(err);

                var messageService = exports.getComponent("messageService");
                messageService.send("ApplicationLifeCycleMessage", {
                    phase: "load"
                });

                return done();
            });
    });

};

exports.unload = function (done) {
    async.each(exports.getServices(),
        function (item, itemCb) {
            item.unload(itemCb);
        },
        function (err) {
            if (err)
                return done(err);

            var messageService = exports.getComponent("messageService");
            messageService.send("ApplicationLifeCycleMessage", {
                phase: "unload"
            });

            return done();
        });
};

exports.pause = function (done) {
    async.each(exports.getServices(),
    function (item, itemCb) {
        item.pause(itemCb);
    },
    function (err) {
        if (err)
            return done(err);

        var messageService = exports.getComponent("messageService");
        messageService.send("ApplicationLifeCycleMessage", {
            phase: "pause"
        });

        return done();
    });
};

exports.resume = function (done) {
    async.each(exports.getServices(),
        function (item, itemCb) {
            item.resume(itemCb);
        },
         function (err) {
             if (err)
                 return done(err);

             var messageService = exports.getComponent("messageService");
             messageService.send("ApplicationLifeCycleMessage", {
                 phase: "resume"
             });

             return done();
         });
};

exports.getServices = function () {
    var keys = ioc.getRegisteredKeys().filter(function (k) {
        return k.endsWith('Service');
    });
    var instances = [];
    keys.forEach(function (k) {
        instances.push(ioc.get(k));
    });
    return instances;
};

exports.getProviders = function () {
    var keys = ioc.getRegisteredKeys().filter(function (k) {
        return k.endsWith('Provider');
    });
    var instances = [];
    keys.forEach(function (k) {
        instances.push(ioc.get(k));
    });
    return instances;
};

exports.getComponent = function (name) {
    return ioc.get(name);
};

exports.getAllComponentInstances = function () {
    return ioc.getAllInstances();
};

exports.overrideComponent = function (name, type) {
    return ioc.override(name, type);
};