var _ = require("underscore"),
    ioc = require('../helper/ioc.node');

var store = {};
exports.get = function (path) {
    try {
        var _context = resolve(path);
        return _context.scope[_context.property];
    } catch (ex) {
        return null;
    }
}


exports.getStore = function () {
    return store;
}

exports.assert = function (path) {
    if (!exports.get(path))
        throw new Error("Configuration " + path + " not present");
}

exports.set = function (path, value) {
    var parts = path.split(':');
    var scope = store;
    if (parts.length > 1) {
        for (var i = 0; i <= parts.length - 2; i++) {
            if (!scope[parts[i]])
                scope[parts[i]] = {};
            scope = scope[parts[i]];
        }
    }
    var property = parts[parts.length - 1];
    scope[property] = value;
}

exports.defaults = function (defaultConfig) {
    _.extend(store, defaultConfig);
}

var resolve = function (path) {
    var parts = path.split(':');
    var scope = store;
    if (parts.length > 1) {
        for (var i = 0; i <= parts.length - 2; i++) {
            scope = scope[parts[i]];
        }
    }
    var property = parts[parts.length - 1];
    if (!property || !scope[property])
        throw new Error(path + " not defined");

    var result = {
        scope: scope,
        property: property
    };
    return result;
}

exports.file = function (path, callback) {
    exports.loadFile(path,
        function (err, respObj) {
            if (err)
                return callback(err);
            _.extend(store, respObj);
            return callback();
        });
}

exports.loadFile = function (path, callback) {
    try {
        if (path.indexOf("ms-appx://") > -1) {
            var networkProvider = ioc.get("networkProvider");
            networkProvider.get(path, function (err, resp) {
                if (err) {
                    networkProvider.get(path.replace("ms-appx://", 
                        location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')), 
                        callback);
                }
                else
                    return callback(null, resp);
            });
        } else {
            var response = require(path);
            return callback(null, response);
        }
    } catch (ex) {
        return callback(ex);
    }
}