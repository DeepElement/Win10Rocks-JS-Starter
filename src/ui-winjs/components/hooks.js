var messageService = MetroNode.sdk.main.getComponent("messageService");
messageService.register("ViewPhaseMessage",
    function (messageType, args) {
        var phase = args.phase;
        var view = args.context;
        var viewModel = view.viewModel;

        /*console.log({
            type: messageType,
            phase: phase
        });*/

        switch (phase) {
            case "preInit":
                WinJS.Utilities.addClass(view.element, "view");
                WinJS.Utilities.addClass(view.element, "loading");
                if (viewModel && viewModel.key)
                    WinJS.Utilities.addClass(view.element, "view-" + viewModel.key);
                App.UI.WinJS.Helpers.markForProcessing(viewModel);
                break;
            case "postInit":
                WinJS.Binding.processAll(view.element, viewModel);
                WinJS.UI.processAll();
                WinJS.Resources.processAll();
                break;
            case "preOnDataSet":
                WinJS.Utilities.addClass(view.element, "loading");
                break;
            case "preBindingReady":
                WinJS.Binding.processAll(view.element, viewModel);
                WinJS.UI.processAll();
                WinJS.Resources.processAll();
                WinJS.Utilities.removeClass(view.element, "loading");
                break;
        }
    });

messageService.register("ApplicationLifeCycleMessage",
    function (messageType, args) {
        var phase = args.phase;

        /*console.log({
            type: messageType,
            phase: phase
        });*/

        switch (phase) {
            case "load":
                App.UI.WinJS.Helpers.registerBindingMode();
                break;
        }
    });