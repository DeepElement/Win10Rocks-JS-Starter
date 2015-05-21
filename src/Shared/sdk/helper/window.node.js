exports.setTimeout = function (delegate, duration) {
    var _self = this;
    return setTimeout(function () {
        if (!_self.pendingDispose) {
            return delegate();
        }
    }, duration);
};

exports.setInterval = function (delegate, duration) {
    var _self = this;
    return setInterval(function () {
        if (!_self.pendingDispose) {
            return delegate();
        }
    }, duration);
};

exports.setImmediate = function (delegate) {
    var _self = this;
    return setImmediate(function () {
        if (!_self.pendingDispose) {
            return delegate();
        }
    });
};