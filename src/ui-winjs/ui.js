define(function (require, exports, module) {
    // Include require compatible modules inline
    require('vendor/Microsoft.WinJS.4.0/js/base.js');
    require('vendor/Microsoft.WinJS.4.0/js/ui.js');
    
    // build the load manifest
    return {
        scripts: [
            "components/helpers.js",
            "components/hooks.js",
            "components/provider/navigation.js",
            "components/provider/network.js",
            "components/navigator.js"],
        styles: [
            'vendor/Microsoft.WinJS.4.0/css/ui-dark.css',
            'vendor/Microsoft.WinJS.4.0/css/ui-dark-intrinsics.css'
        ]
    };
});