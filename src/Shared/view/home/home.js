(function () {
    "use strict";

    MetroNode.sdk.view.define("/view/home/home.html",
        MetroNode.sdk["view-model"].home,
        {
            onBindingReady: function () {
                var that = this;
                console.log("HomeView:onBindingReady");
                document.querySelector("#navToSplash").onclick = function (args) {
                    that.MessageService.send("NavigateToMessage", {
                        viewKey: "splash"
                    });
                };
                document.querySelector("#navToSettings").onclick = function (args) {
                    that.MessageService.send("NavigateToMessage", {
                        viewKey: "settings"
                    });
                };
            }
        });
})();
