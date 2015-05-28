exports.setTimeout = function (delegate, duration) {
    var _self = this;
    return window.setTimeout(function () {
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

exports.loadScript = function (url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}