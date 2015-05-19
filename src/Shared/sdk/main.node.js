var ioc = require('./helper/ioc.node');

// Register container instances
//ioc.register(require('./service/navigation.node').prototype, "application");
//ioc.register(require('./provider/logging.node'), "request");
//ioc.register(require('./view-model/home.node', 'request'));
//ioc.register(require('./view-model/login.node', 'request'));
//ioc.register(require('./view-model/settings.node', 'request'));
//ioc.register(require('./view-model/splash.node', 'request'));

exports.load = function (done) {
    console.log("Main:load");


    return done();
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