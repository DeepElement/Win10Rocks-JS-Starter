var resolver = require('./resolver'),
    jsdom = require('jsdom');

global = global || {};
global.window = global.window || {};
global.msWriteProfilerMark = function () { };
global.addEventListener = function () { };
global.navigator = {
    userAgent: ""
};

/*var deleteRequireModulesInPath = function (path) {
    for (var key in require.cache) {
        if (require.cache[key].id.indexOf(path) > -1)
            delete require.cache[key];
    }
}*/

/*beforeEach(function (done) {
    jsdom.env("<html></html>", function (err, window) {
        if (err)
            return done(err);
        
        global.window = window;
        global.document = window.document;
        
        deleteRequireModulesInPath(path.join(__dirname, ".."));
        require('../src/Shared/vendor/WinJS/js/WinJS');
        return done();
    });
});*/