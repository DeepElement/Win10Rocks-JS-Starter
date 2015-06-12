var uuid = require('uuid');

var _registery = {};
var _scopes = ["application", "request"];

var _validateScope = function (scope) {
    if (_scopes.indexOf(scope) == -1)
        throw new Error("Scope invalid");
};

exports.override = function (key, clazz) {
    if (_registery[key]) {
        _registery[key].type = clazz;
        _registery[key].instances = [];
    }
};

exports.register = function (key, clazz, scope) {
    _validateScope(scope);

    _registery[key] = {
        scope: scope,
        type: clazz,
        instances: []
    };
};

exports.getRegisteredKeys = function () {
    var results = [];
    for (var key in _registery)
        results.push(key);
    return results;
};

exports.getAllInstances = function () {
    var results = [];
    for (var registryKey in _registery) {
        var instance = _registery[registryKey];
        if (instance) {
            instance.instances.forEach(function (i) {
                results.push(i);
            });
        }
    }
    return results;
};

exports.get = function (key) {
    if (!_registery[key])
        throw new Error("Instance " + key + " is not registered");

    var registryRecord = _registery[key];
    var appResult = null;
    switch (registryRecord.scope) {
        case "application":
            if (registryRecord.instances.length == 0) {
                appResult = new registryRecord.type();
                appResult._instance = uuid.v4();
                registryRecord.instances.push(appResult);
            } else {
                appResult = registryRecord.instances[0];
            }
            break;
        case "request":
            appResult = new registryRecord.type();
            appResult._instance = uuid.v4();
            registryRecord.instances.push(appResult);
            break;
    }

    return appResult;
};

exports.clear = function () {
    for (var registryKey in _registery) {
        var instance = _registery[registryKey];
        if (instance) {
            // ASAP notfiy of the dispose request
            instance.instances.forEach(function (i) {
                i.pendingDispose = true;
            });

            // Do the delete
            instance.instances.forEach(function (i) {
                delete i;
            });
        }
        delete instance;
    }
    _registery = {};
};