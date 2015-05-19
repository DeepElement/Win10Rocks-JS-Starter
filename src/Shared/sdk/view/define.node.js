var ioc = require('../main.node').ioc;

module.exports = function (template, viewModelType, scope) {
    var baseViewOverrides = {
        init: function (element, options) {
            this.element = element;

            // TODO: Locate the VM from history based on Navigation url
            var navigationService = ioc.get(require("../service/navigation.node"));

            navigationService.getViewModelFromUri();


            if (!this._viewModel || !this._viewModel.key)
                this.viewModel = new viewModelType();

            if (this._init)
                return this._init(element, options);
        },

        onDataSet: function () {
            this._onDataSetFlag = true;

            if (this._onDataSet)
                return this._onDataSet();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.onBindingReady();
        },

        onDataLoaded: function () {
            this._onDataLoadedFlag = true;

            if (this._onDataLoaded)
                return this._onDataLoaded();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.onBindingReady();
        },

        onBindingReady: function () {
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
}