var ioc = require('../main.node').ioc,
    config = require("../helper/config.node"),
    main = require('../main.node'),
    windowHelper = require('../helper/window.node');

module.exports = function (template, viewModelType, scope) {
    var baseViewOverrides = {
        init: function (element, options) {
            this.element = element;
            this.MessageService = main.getServiceByName("message");

            if (!this._viewModel || !this._viewModel.key) {
                // TODO: Recover VM on back navigation
                this.viewModel = new viewModelType();

                this.viewModel.addEventListener("data", this.onDataSet.bind(this));
                this.viewModel.addEventListener("loaded", this.onDataLoaded.bind(this));
            }

            if (this._init)
                return this._init(element, options);
        },

        onDataSet: function () {
            var that = this;
            this._onDataSetFlag = true;

            if (this._onDataSet)
                return this._onDataSet();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.onBindingReady();

            windowHelper.setTimeout(function () {
                if (!that._onDataLoadedFlag) {
                    var messageService = main.ioc.getServiceByName("message");
                    messageService.send("NavigateToMessage", {
                        viewKey: "error",
                        errorKey: "view-load-timeout"
                    });
                }
            }, config.get("behaviors:viewLoadTimeout"));
        },

        onDataLoaded: function () {
            this._onDataLoadedFlag = true;

            if (this._onDataLoaded)
                return this._onDataLoaded();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.onBindingReady();
        },

        onBindingReady: function () {
            console.log("BaseView:onBindingReady");
            this._onBindingReadyFlag = true;

            if (this._onBindingReady)
                return this._onBindingReady();
        }
    };

    for (var method in baseViewOverrides) {
        if (scope[method])
            scope["_" + method] = scope[method];
        scope[method] = baseViewOverrides[method];
    }

    // Extend scope to allow framwork override
    scope._viewModel = {};
    scope.viewModel = {
        get: function () {
            return this._viewModel;
        },
        set: function (val) {
            this._viewModel = val;
        }
    };

    var viewClazz = WinJS.UI.Pages.define(template, scope);
    WinJS.Class.mix(viewClazz, WinJS.Utilities.eventMixin);

    return viewClazz;
}