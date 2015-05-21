(function () {
    "use strict";

    MetroNode.sdk.view.define("/view/settings/settings.html",
        MetroNode.sdk["view-model"].settings,
    {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var that = this;
            // TODO: Initialize the page here.
            document.querySelector("#navToHome").onclick = function (args) {
                that.MessageService.send("NavigateToMessage", {
                    viewKey: "home"
                });
            };
        }
    });
})();
