var _ = require("underscore");

var store = {};
exports.get = function (path) {
    try {
        var _context = resolve(path);
        return _context.scope[_context.property];
    } catch (ex) {
        return null;
    }
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
    var _url = path;
    WinJS.xhr({
        url: _url
    }).done(function (response) {
        _.extend(store, JSON.parse(response.responseText));
        if (callback)
            return callback();
    },
        function (err) {
            throw new Error(err);
        });
}
