define(function (require, exports, module) {
    MetroNode.sdk.main.load(function () {
        WinJS.UI.processAll();

        MetroNode.sdk.main.getComponent("messageService").send("NavigateToMessage", {
            viewKey: "splash"
        });
    });


    WinJS.Application.start();
    return {};
});