var classHelper = require('./class.node');

module.exports = {
    createEventProperty: function (name) {
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
    },
    createEventProperties: function () {
        var props = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
            var name = arguments[i];
            props["on" + name] = module.exports.createEventProperty(name);
        }
        return props;
    },
    timerMixin: {
        setTimeout: function (delegate, duration) {
            var _self = this;
            var timerId = setTimeout(function () {
                if (!_self.pendingDispose) {
                    return delegate();
                }
                else
                    clearTimeout(timerId);
            }, duration);
            return timerId;
        },

        setInterval: function (delegate, duration) {
            var _self = this;
            var intervalId = setInterval(function () {
                if (!_self.pendingDispose) {
                    return delegate();
                }
                else
                    clearTimeout(intervalId);
            }, duration);
            return intervalId;
        },

        setImmediate: function (delegate) {
            var _self = this;
            var immediateId = setImmediate(function () {
                if (!_self.pendingDispose) {
                    return delegate();
                }
                else
                    clearTimeout(immediateId);
            });
            return immediateId;
        },

        clearTimeout: function (timerId) {
            return clearTimeout(timerId);
        }
    },
    eventMixin: {
        _listeners: null,
        _EventMixinEvent: classHelper.define(
            function (type, detail, target) {
                this.detail = detail;
                this.target = target;
                this.timeStamp = Date.now();
                this.type = type;
            },
            {
                bubbles: { value: false, writable: false },
                cancelable: { value: false, writable: false },
                currentTarget: {
                    get: function () { return this.target; }
                },
                defaultPrevented: {
                    get: function () { return this._preventDefaultCalled; }
                },
                trusted: { value: false, writable: false },
                eventPhase: { value: 0, writable: false },
                target: null,
                timeStamp: null,
                type: null,

                preventDefault: function () {
                    this._preventDefaultCalled = true;
                },
                stopImmediatePropagation: function () {
                    this._stopImmediatePropagationCalled = true;
                },
                stopPropagation: function () {
                }
            }),

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
                var eventValue = new this._EventMixinEvent(type, details, this);
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
    }
};