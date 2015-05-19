(function () {
    "use strict";

    MetroNode.sdk.view.define("/pages/settings/settings.html",
        MetroNode.sdk["view-model"].settings,
    {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.querySelector("#navToHome").onclick = function (args) {
                WinJS.Navigation.navigate("/pages/home/home.html", "test value");
            };
        }
    });
})();
