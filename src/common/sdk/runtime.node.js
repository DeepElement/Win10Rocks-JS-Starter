String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

Array.prototype.contains = function (target, ordered) {
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
window.Class.Utilities = window.Class.Utilities || {};

window.Class.define = window.Class.define || function (_constructor, methods) {
    _constructor.prototype.constructor = _constructor;
    window.Class.mix(_constructor, methods);
    return _constructor;
};

window.Class.derive = window.Class.derive || function (parentClassDef, childClassConstructor, childClassMethods) {
    // Parasitic Combination Inheritance
    var copyOfParent = Object.create(parentClassDef.prototype);
    copyOfParent.constructor = childClassConstructor;
    childClassConstructor.prototype = copyOfParent;

    // super/base exposed for profit
    childClassMethods.super = parentClassDef;
    childClassMethods.base = parentClassDef.prototype;

    return window.Class.define(childClassConstructor, childClassMethods);
};

window.Class.mix = window.Class.mix || function (classDef, mixinDef) {
    for (var propertyKey in mixinDef) {
        if (mixinDef[propertyKey] && (mixinDef[propertyKey]["get"] || mixinDef[propertyKey]["set"]))
            Object.defineProperty(classDef.prototype, propertyKey, mixinDef[propertyKey]);
        else
            classDef.prototype[propertyKey] = mixinDef[propertyKey];
    }
};

window.Class.Utilities.createEventProperty = window.Class.Utilities.createEventProperty || function (name) {
    var eventPropStateName = "_on" + name + "state";
    return {
        get: function () {
            var state = this[eventPropStateName];
            return state && state.userHandler;
        },
        set: function (handler) {
            var state = this[eventPropStateName];
            if (handler) {
                if (!state) {
                    state = { wrapper: function (evt) { return state.userHandler(evt); }, userHandler: handler };
                    Object.defineProperty(this, eventPropStateName, { value: state, enumerable: false, writable: true, configurable: true });
                    this.addEventListener(name, state.wrapper, false);
                }
                state.userHandler = handler;
            } else if (state) {
                this.removeEventListener(name, state.wrapper, false);
                this[eventPropStateName] = null;
            }
        },
        enumerable: true
    };
};

window.Class.Utilities.createEventProperties = window.Class.Utilities.createEventProperties || function () {
    var props = {};
    for (var i = 0, len = arguments.length; i < len; i++) {
        var name = arguments[i];
        props["on" + name] = createEventProperty(name);
    }
    return props;
};

window.Class.Utilities.eventMixin = window.Class.Utilities.eventMixin || {
    _listeners: null,

    addEventListener: function (type, listener, useCapture) {
        useCapture = useCapture || false;
        this._listeners = this._listeners || {};
        var eventListeners = (this._listeners[type] = this._listeners[type] || []);
        for (var i = 0, len = eventListeners.length; i < len; i++) {
            var l = eventListeners[i];
            if (l.useCapture === useCapture && l.listener === listener) {
                return;
            }
        }
        eventListeners.push({ listener: listener, useCapture: useCapture });
    },
    dispatchEvent: function (type, details) {
        var listeners = this._listeners && this._listeners[type];
        if (listeners) {
            var eventValue = new EventMixinEvent(type, details, this);
            listeners = listeners.slice(0, listeners.length);
            for (var i = 0, len = listeners.length; i < len && !eventValue._stopImmediatePropagationCalled; i++) {
                listeners[i].listener(eventValue);
            }
            return eventValue.defaultPrevented || false;
        }
        return false;
    },
    removeEventListener: function (type, listener, useCapture) {
        useCapture = useCapture || false;
        var listeners = this._listeners && this._listeners[type];
        if (listeners) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                var l = listeners[i];
                if (l.listener === listener && l.useCapture === useCapture) {
                    listeners.splice(i, 1);
                    if (listeners.length === 0) {
                        delete this._listeners[type];
                    }
                    break;
                }
            }
        }
    }
};


