var WinJSNavigationProvider = function (options) {
}

var members = {
    navigate: function (viewKey, state) {
        WinJS.Navigation.navigate("/view/" + viewKey + "/" + viewKey + ".html", {
            viewKey: viewKey,
            state: state
        });
    },
    definePage: function (template, viewDef) {
        return WinJS.UI.Pages.define(template, viewDef);
    }
}

var classDefinition = MetroNode.sdk.helper.class.define(WinJSNavigationProvider, members);
MetroNode.sdk.main.overrideComponent("navigationProvider", classDefinition);