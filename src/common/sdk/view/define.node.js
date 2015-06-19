var ioc = require('../helper/ioc.node'),
    config = require("../helper/config.node"),
    main = require('../main.node'),
    windowHelper = require('../helper/window.node'),
    classHelper = require('../helper/class.node'),
    utilityHelper = require('../helper/utilities.node');


module.exports = function (template, viewModelType, scope) {
    var baseViewOverrides = {
        init: function (element, options) {
            this.element = element;
            this.MessageService = main.getComponent("messageService");

            if (!this._viewModel || !this._viewModel.key) {
                // TODO: Recover VM on back navigation
                this.viewModel = new viewModelType();

                if (options && options.viewKey)
                    this.viewModel.key = options.viewKey;

                this.viewModel.addEventListener("data", this.onDataSet.bind(this));
                this.viewModel.addEventListener("loaded", this.onDataLoaded.bind(this));
            }

            this.MessageService.send("ViewPhaseMessage", {
                phase: "preInit",
                context: this
            });

            if (this._init)
                return this._init(element, options);

            this.MessageService.send("ViewPhaseMessage", {
                phase: "init",
                context: this
            });

            this.MessageService.send("ViewPhaseMessage", {
                phase: "postInit",
                context: this
            });
        },

        onDataSet: function () {
            this.MessageService.send("ViewPhaseMessage", {
                phase: "preOnDataSet",
                context: this
            });

            var that = this;
            this._onDataSetFlag = true;

            if (this._onDataSet)
                return this._onDataSet();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.bindingReady();


            this.MessageService.send("ViewPhaseMessage", {
                phase: "onDataSet",
                context: this
            });

            this.MessageService.send("ViewPhaseMessage", {
                phase: "postOnDataSet",
                context: this
            });
        },

        onDataLoaded: function () {
            this.MessageService.send("ViewPhaseMessage", {
                phase: "preOnDataLoaded",
                context: this
            });

            this._onDataLoadedFlag = true;

            if (this._onDataLoaded)
                return this._onDataLoaded();

            if (this._onDataLoadedFlag && this._onDataSetFlag)
                this.bindingReady();

            this.MessageService.send("ViewPhaseMessage", {
                phase: "onDataLoaded",
                context: this
            });

            this.MessageService.send("ViewPhaseMessage", {
                phase: "postOnDataLoaded",
                context: this
            });
        },

        bindingReady: function () {
            this.MessageService.send("ViewPhaseMessage", {
                phase: "preBindingReady",
                context: this
            });

            if (this._bindingReady)
                return this._bindingReady();

            this.MessageService.send("ViewPhaseMessage", {
                phase: "bindingReady",
                context: this
            });

            this.MessageService.send("ViewPhaseMessage", {
                phase: "postBindingReady",
                context: this
            });
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
            this.dispatchEvent("viewModel");
        }
    };

    var navigationProvider = ioc.get("navigationProvider");
    var viewClazz = navigationProvider.definePage(template, scope);
    classHelper.mix(viewClazz, utilityHelper.eventMixin);
    classHelper.mix(module.exports, utilityHelper.timerMixin);

    return viewClazz;
};