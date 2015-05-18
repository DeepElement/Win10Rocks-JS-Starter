exports.load = function (done) {
    console.log("Main:load");
    console.log(window.process.env);
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