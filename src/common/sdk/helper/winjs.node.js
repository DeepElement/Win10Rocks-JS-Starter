exports.registerBindingMode = function () {
    // Relay Command Binding
    global.Binding = global.Binding || {};
    global.Binding.Mode = global.Binding.Mode || {};
    global.Binding.Mode.Command = WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
        debugger
        var eventSource = dest;
        var command = source;
        var sourceItems = destProps.length;
        var destItems = sourceProps.length;
        for (var i = 0; i < sourceItems - 1; i++) {
            eventSource = eventSource[destProps[i]];
        }
        for (var x = 0; x < destItems ; x++) {
            command = command[sourceProps[x]];
        }

        //Subscribes the event
        eventSource[destProps[sourceItems - 1]] = function () {
            if (!WinJS.Utilities.hasClass('win-command-disabled')) {
                command["execute"].call(source, dest);
            }
        };

        //monitors canExecute
        command["canExecute"].bind("value", function (isEnabled) {
            if (isEnabled) {
                WinJS.Utilities.removeClass(eventSource, 'win-command-disabled');
            } else {
                WinJS.Utilities.addClass(eventSource, 'win-command-disabled');
            }
        });
    });
}

exports.markForProcessing = function (subject) {
    var _self = this;
    for (var _property in subject)
        if (subject.hasOwnProperty(_property)) {
            if (typeof subject[_property] == "object")
                _self.markForProcessing(subject[_property]);
            else
                WinJS.Utilities.markSupportedForProcessing(subject[_property]);
        }
};