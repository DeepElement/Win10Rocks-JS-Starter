var ioc = require('../main.node').ioc,
    config = require("../helper/config.node"),
    main = require('../main.node'),
    windowHelper = require('../helper/window.node'),
    winjsHelper = require("../helper/winjs.node");

module.exports = function (template, viewModelType, scope) {
    var baseViewOverrides = {
        init: function (element, options) {
            console.log("view:init");
            this.element = element;
            this.MessageService = main.getComponent("messageService");

            if (!this._viewModel || !this._viewModel.key) {
                // TODO: Recover VM on back navigation
                this.viewModel = new viewModelType();

                if (options && options.viewKey)
                    this.viewModel.key = options.viewKey;

                winjsHelper.markForProcessing(this.viewModel);

                this.viewModel.addEventListener("data", this.onDataSet.bind(this));
                this.viewModel.addEventListener("loaded", this.onDataLoaded.bind(this));
            }

            // Add base view classes
            WinJS.Utilities.addClass(element, "view");
            WinJS.Utilities.addClass(element, "loading");
            if (this.viewModel.key)
                WinJS.Utilities.addClass(element, "view-" + this.viewModel.key);

            if (this._init)
                return this._init(element, options);


            WinJS.Binding.processAll(this.element, this.viewModel);
            WinJS.UI.processAll();
            WinJS.Resources.processAll();
        },

        onDataSet: function () {
            console.log("view:onDataSet");
            var that = this;
            this._onDataSetFlag = true;

            WinJS.Utilities.addClass(this.element, "loading");

            if (this._onDataSet)
                return this._onDataSet();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.bindingReady();
        },

        onDataLoaded: function () {
            console.log("view:onDataLoaded");
            this._onDataLoadedFlag = true;

            if (this._onDataLoaded)
                return this._onDataLoaded();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.bindingReady();
        },

        bindingReady: function () {
            console.log("view:bindingReady");
            this._BindingReadyFlag = true;

            WinJS.Binding.processAll(this.element, this.viewModel);
            WinJS.UI.processAll();
            WinJS.Resources.processAll();

            WinJS.Utilities.removeClass(this.element, "loading");

            if (this._bindingReady)
                return this._bindingReady();
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
            winjsHelper.markForProcessing(this._viewModel);
            this.dispatchEvent("viewModel");
        }
    };

    var viewClazz = WinJS.UI.Pages.define(template, scope);
    WinJS.Class.mix(viewClazz, WinJS.Utilities.eventMixin);

    return viewClazz;
}