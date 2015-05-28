var WinJSNetworkProvider = function (options) {
}

var members = {
    get: function (path, callback) {
        WinJS.xhr({
            url: path
        }).done(function (response) {
            return callback(null, JSON.parse(response.responseText));
        },
          function (err) {
              return callback(err);
          });
    }
}

var classDefinition = MetroNode.sdk.helper.class.define(WinJSNetworkProvider, members);
MetroNode.sdk.main.overrideComponent("networkProvider", classDefinition);