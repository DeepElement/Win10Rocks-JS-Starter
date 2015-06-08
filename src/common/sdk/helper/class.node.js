module.exports = {
    define: function (_constructor, methods) {
        _constructor.prototype.constructor = _constructor;
        module.exports.mix(_constructor, methods);
        return _constructor;
    },
    derive: function (parentClassDef, childClassConstructor, childClassMethods) {
        // Parasitic Combination Inheritance
        var copyOfParent = Object.create(parentClassDef.prototype);
        copyOfParent.constructor = childClassConstructor;
        childClassConstructor.prototype = copyOfParent;

        // super/base exposed for profit
        childClassMethods.super = parentClassDef;
        childClassMethods.base = parentClassDef.prototype;

        return module.exports.define(childClassConstructor, childClassMethods);
    },
    mix: function (classDef, mixinDef) {
        for (var propertyKey in mixinDef) {
            if (mixinDef[propertyKey] && (mixinDef[propertyKey]["get"] || mixinDef[propertyKey]["set"]))
                Object.defineProperty(classDef.prototype, propertyKey, mixinDef[propertyKey]);
            else
                classDef.prototype[propertyKey] = mixinDef[propertyKey];
        }
    }
};