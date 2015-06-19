(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;
    var hasActivated = false;

    var activationHandler = function (args) {
        hasActivated = true;
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
                MetroNode.sdk.main.load(function () {
                    // TODO: Loaded actions
                    MetroNode.sdk.main.getComponent("messageService").send("NavigateToMessage", {
                        viewKey: "splash"
                    });
                });
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
                MetroNode.sdk.main.resume(function () {
                    // TODO: Resume actions
                });
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    };

    app.addEventListener("activated", activationHandler);

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
        MetroNode.sdk.main.pause(function () {
            // TODO: Pause actions
        });
    };

    app.onerror = function (e) {
        debugger
        var message = e.detail.message;
        var description = e.detail.description;
        var code = e.detail.number;
        var stackTrace = e.detail.stack;
        var msgBox = new Windows.UI.Popups.MessageDialog(
            description, e.detail.errorMessage
            );
        msgBox.showAsync().done();
        return true;
    };

    app.start();

    setTimeout(function () {
        if(!hasActivated)
            activationHandler({
                detail: {
                    kind: activation.ActivationKind.launch,
                    previousExecutionState: activation.ApplicationExecutionState.notRunning
                },
                setPromise: function () { }
            });
    }, 2000);
})();