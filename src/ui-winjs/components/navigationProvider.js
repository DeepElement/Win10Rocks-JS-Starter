var WinJSNavigationProvider = function (options) {
}

var members = {
    navigate: function (viewKey, state) {
        WinJS.Navigation.navigate("/view/" + viewKey + "/" + viewKey + ".html", {
            viewKey: viewKey,
            state: state
        });
    }
}

var classDefinition = MetroNode.sdk.helper.class.define(WinJSNavigationProvider, members);
MetroNode.sdk.main.overrideComponent("navigationProvider", classDefinition);