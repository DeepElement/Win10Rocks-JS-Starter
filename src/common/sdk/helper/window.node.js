var async = require('async');

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
};


exports.loadResource = function(url, type, callback) {
    var head = document.getElementsByTagName('head')[0];
    switch (type) {
        case "script":
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            script.onreadystatechange = callback;
            script.onload = callback;

            head.appendChild(script);
            break;
        case "style":
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = url;
            link.type = "text/css";
            link.rel = "stylesheet";
            link.media = "screen,print";

            link.onreadystatechange = callback;
            link.onload = callback;

            head.appendChild(link);
            break;
    }
};



exports.loadResourcesSeries = function(type, items, callback){
  var payload = [];
    items.forEach(function(s){
       payload.push({
           type: type,
           url: s
       });
    });
    async.eachSeries(payload,
        function(item, itemCb){
            exports.loadResource(item.url, item.type, function(){
                return itemCb();
            });
        },
        function(err){
            return callback();
        });
};


exports.loadResourcesAsync = function(type, items, callback){
  var payload = [];
    items.forEach(function(s){
       payload.push({
           type: type,
           url: s
       });
    });
    async.each(payload,
        function(item, itemCb){
            exports.loadResource(item.url, item.type, function(){
                return itemCb();
            });
        },
        function(err){
            return callback();
        });
};

