requirejs.config({
    baseUrl: '/',
    shim: {
        "metro.node.js": {
            deps: []
        },
        "ui.js": {
            deps: ["metro.node.js"]
        },
        "platform.js": {
            deps: ["ui.js"]
        }
    }
});

requirejs(['metro.node.js', 'ui.js'],
    function (metroNode, ui) {
        window.MetroNode = metroNode;

        MetroNode.sdk.helper.window.loadResourcesSeries('script', ui.scripts,
            function () {
                requirejs(['platform.js'], function () { });
            });

        MetroNode.sdk.helper.window.loadResourcesAsync('style', ui.styles,
            function () {
            });
    });