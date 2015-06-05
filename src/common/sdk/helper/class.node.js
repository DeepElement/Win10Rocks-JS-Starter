exports.define = function (constructor, members, staticMembers) {
    return WinJS.Class.define(constructor, members, staticMembers);
}

exports.derive = function (superClazz, constructor, members, staticMembers) {
    var parentMethods = Object.getOwnPropertyNames(superClazz.prototype).filter(function (p) {
        return typeof superClazz.prototype[p] === 'function';
    });
    var parentProperties = Object.getOwnPropertyNames(superClazz.prototype).filter(function (p) {
        return typeof superClazz.prototype[p] !== 'function';
    });

    parentMethods.forEach(function (method) {
        if (!members[method])
            members[method] = superClazz.prototype[method];
    });

    parentProperties.forEach(function (prop) {
        if (!members[prop])
            members[prop] = superClazz.prototype[prop];
    });

    return WinJS.Class.derive(superClazz, constructor, members, staticMembers);
}