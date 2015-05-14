(function () {
    "use strict";

    MetroNode.sdk.view.define("/pages/home/home.html",
        MetroNode.sdk["view-model"].home,
        {
            onBindingReady: function () {
                document.querySelector("#navToSplash").onclick = function (args) {
                    WinJS.Navigation.navigate("/pages/splash/splash.html", "test value");
                };
            }
        });
})();
