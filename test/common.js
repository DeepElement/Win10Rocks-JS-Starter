﻿var resolver = require('./resolver'),
    jsdom = require('jsdom'),
    path = require('path');

var winJSShim = function () {
    global = global || {};
    global.window = global.window || {};
    global.msWriteProfilerMark = function () { };
    global.addEventListener = function () { };
    global.navigator = {
        userAgent: ""
    };
    global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
};

var jsdomShim = function () {
    global.document.documentElement.classList = {
        add : function () {
            
        }
    };
};

var deleteRequireModulesInPath = function (path) {
    for (var key in require.cache) {
        if (require.cache[key].id.indexOf(path) > -1)
            delete require.cache[key];
    }
};

var includeScript = function include(f) {
    var fs = require("fs");
    var path = require("path");
    var full = path.join(f);
    eval.apply(global, [fs.readFileSync(full).toString()]);
};

beforeEach(function (done) {
    jsdom.env("<html></html>", function (err, window) {
        if (err)
            return done(err);
        
        // SHIM Globals
        winJSShim();
        
        global.window = window;
        global.window.process = global.window.process || {};
        global.window.process.env = global.window.process.env || {};
        window.process.env["configuration"] = "test";
        window.process.env["path:app:baseDir"] = path.join(__dirname, "..", "src", "App");
        window.process.env["path:ui:baseDir"] = path.join(__dirname, "..", "src", "UI-WinJS");
        window.process.env["path:common:baseDir"] = path.join(__dirname, "..", "src", "common");
        
        global.document = window.document;
        
        // SHIM JSDOM
        jsdomShim();
        
        deleteRequireModulesInPath(path.join(__dirname, ".."));
        
        // INCLUDE JS RUNTIME
        includeScript(__dirname + '/../src/ui-winjs/vendor/WinJS-4.0.0-preview/js/WinJS.js');
        
        return done();
    });
});