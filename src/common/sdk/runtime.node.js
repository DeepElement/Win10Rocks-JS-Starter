String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

Array.prototype.contains = function(target, ordered) {
    ordered = ordered || false;
    if (ordered) {
        var lastIdx = -1;
        var foundAll = true;
        for (var i = 0; i <= target.length - 1; i++) {
            lastIdx = this.indexOf(target[i], lastIdx + 1);
            if (lastIdx == -1) {
                foundAll = false;
                break;
            }
        }
        return foundAll;
    } else {
        var foundAll = true;
        for (var i = 0; i <= target.length - 1; i++) {
            if (this.indexOf(target[i]) == -1) {
                foundAll = false;
                break;
            }
        }
        return foundAll;
    }
};

window.Class = window.Class || {};

window.Class.define = window.Class.define || function(_constructor, methods){
    _constructor.prototype.constructor = _constructor;
    window.Class.mix(_constructor, methods);
    return _constructor;
};

window.Class.derive = window.Class.derive || function(parentClassDef, childClassConstructor, childClassMethods){
    // Parasitic Combination Inheritance
    var copyOfParent = Object.create(parentClassDef.prototype);
    copyOfParent.constructor = childClassConstructor;
    childClassConstructor.prototype = copyOfParent;
    
    // super/base exposed for profit
    childClassMethods.super = parentClassDef;
    childClassMethods.base = parentClassDef.prototype;
    
    return window.Class.define(childClassConstructor, childClassMethods);
};

window.Class.mix = window.Class.mix || function(classDef, mixinDef){
    for(var propertyKey in mixinDef)
    {
        if(mixinDef[propertyKey] && (mixinDef[propertyKey]["get"] || mixinDef[propertyKey]["set"]))
            Object.defineProperty(classDef.prototype, propertyKey, mixinDef[propertyKey]);
        else
        classDef.prototype[propertyKey] = mixinDef[propertyKey];
    }
};

