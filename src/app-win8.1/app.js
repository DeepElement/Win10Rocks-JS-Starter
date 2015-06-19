requirejs.config({
    baseUrl: '/',
    shim: {
        ".metro.node.js": {
            deps: []
        },
        "ui.js": {
            deps: [".metro.node.js"]
        },
        "platform.js": {
            deps: ["ui.js"]
        }
    }
});

requirejs(['.metro.node.js', 'ui.js'],
    function (metroNode, ui) {
        window.MetroNode = metroNode;

        var app = WinJS.Application;
        window.queuedLifeCycleEvents = [];
        app.addEventListener("activated", function (args) {
            window.queuedLifeCycleEvents.push({
                type: "activated",
                args: args
            });
        });

        MetroNode.sdk.helper.window.loadResourcesSeries('script', ui.scripts,
            function () {
                requirejs(['platform.js'], function () { });
            });

        MetroNode.sdk.helper.window.loadResourcesAsync('style', ui.styles,
            function () {
            });
    });