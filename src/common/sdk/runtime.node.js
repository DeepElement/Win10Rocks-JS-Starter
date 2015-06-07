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

Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) 
	{ 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.super = parentClassOrObject.prototype;
	} 
	else 
	{ 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.super = parentClassOrObject;
	} 
	return this;
};

window.Class = window.Class || {};

window.Class.define = window.Class.define || function(_constructor, methods){
    _constructor.prototype.constructor = _constructor;
    for(var propertyKey in methods)
    {
        if(methods[propertyKey] && (methods[propertyKey]["get"] || methods[propertyKey]["set"]))
            Object.defineProperty(_constructor.prototype, propertyKey, methods[propertyKey]);
        else
        _constructor.prototype[propertyKey] = methods[propertyKey];
    }
    return _constructor;
};

window.Class.derive = window.Class.derive || function(parentClassDef, childClassConstructor, childClassMethods){
    // Parasitic Combination Inheritance
    var copyOfParent = Object.create(parentClassDef.prototype);
    copyOfParent.constructor = childClassConstructor;
    childClassConstructor.prototype = copyOfParent;
    childClassMethods.super = parentClassDef;
    childClassMethods.base = parentClassDef.prototype;
    return window.Class.define(childClassConstructor, childClassMethods);
};

window.Class.extend = window.Class.extend || function(){
    
};

