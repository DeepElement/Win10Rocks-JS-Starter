var uuid = require('uuid');

var _registery = {};
var _scopes = ["application", "request"];

var _validateScope = function (scope) {
    if (_scopes.indexOf(scope) == -1)
        throw new Error("Scope invalid");
}

exports.register = function (clazz, scope) {
    _validateScope(scope);

    _registery[clazz] = {
        scope: scope,
        type: clazz,
        instances: []
    };
}

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
}

exports.get = function (clazz) {
    if (!_registery[clazz])
        throw new Error("Instance " + clazz + " is not registered");

    var registryRecord = _registery[clazz];
    var appResult = null;
    switch (registryRecord.scope) {
        case "application":
            if (registryRecord.instances.length == 0) {
                appResult = new clazz();
                appResult._instance = uuid.v4();
                registryRecord.instances.push(appResult);
            } else {
                appResult = registryRecord.instances[0];
            }
            break;
        case "request":
            appResult = new clazz();
            appResult._instance = uuid.v4();
            registryRecord.instances.push(appResult);
            break;
    }

    return appResult;
}

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
}