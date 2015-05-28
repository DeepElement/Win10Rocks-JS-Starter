(function () {
    "use strict";

    var nav = WinJS.Navigation;

    WinJS.Namespace.define("Application.Controls", {
        Navigator: WinJS.Class.define(
            // Define the constructor function for the PageControlNavigator.
            function PageControlNavigator(element, options) {
                this._element = element || document.createElement("div");


                this._element.appendChild(this._createPageElement());

                this._progressElement = document.createElement("div");
                WinJS.Utilities.addClass(this._progressElement, "win-disposable loading-container");
                var progress = document.createElement("progress");
                WinJS.Utilities.addClass(progress, "win-ring");
                this._progressElement.appendChild(progress);
                this._element.appendChild(this._progressElement);

                this.home = options.home;

                this._eventHandlerRemover = [];

                var that = this;
                function addRemovableEventListener(e, eventName, handler, capture) {
                    e.addEventListener(eventName, handler, capture);
                    that._eventHandlerRemover.push(function () {
                        e.removeEventListener(eventName, handler);
                    });
                };

                addRemovableEventListener(nav, 'navigating', this._navigating.bind(this), false);
                addRemovableEventListener(nav, 'navigated', this._navigated.bind(this), false);

                window.onresize = this._resized.bind(this);

                Application.navigator = this;
            }, {
                home: "",
                /// <field domElement="true" />
                _element: null,
                _progressElement: null,
                _lastNavigationPromise: WinJS.Promise.as(),
                _lastViewstate: 0,

                // This is the currently loaded Page object.
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                // This is the root element of the current page.
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },

                // This function disposes the page navigator and its contents.
                dispose: function () {
                    if (this._disposed) {
                        return;
                    }

                    this._disposed = true;
                    WinJS.Utilities.disposeSubTree(this._element);
                    for (var i = 0; i < this._eventHandlerRemover.length; i++) {
                        this._eventHandlerRemover[i]();
                    }
                    this._eventHandlerRemover = null;
                },

                // Creates a container for a new page to be loaded into.
                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.setAttribute("dir", window.getComputedStyle(this._element, null).direction);
                    element.style.position = "absolute";
                    element.style.visibility = "hidden";
                    element.style.width = "100%";
                    element.style.height = "100%";
                    WinJS.Utilities.addClass(element, "hidden");
                    return element;
                },

                // Retrieves a list of animation elements for the current page.
                // If the page does not define a list, animate the entire page.
                _getAnimationElements: function () {
                    if (this.pageControl && this.pageControl.getAnimationElements) {
                        return this.pageControl.getAnimationElements();
                    }
                    return this.pageElement;
                },

                _navigated: function () {
                    var that = this;
                    this.pageElement.style.visibility = "";
                    WinJS.UI.Animation.enterPage(this._getAnimationElements()).done(function () {
                        var messageService = MetroNode.sdk.main.getComponent("messageService");
                        messageService.send("NavigatedMessage", {
                            url: nav.location,
                            view: that.pageControl,
                            viewModel: that.pageControl.viewModel,
                            state: nav.state
                        });
                    });
                },

                onViewDataSet: function () {
                    WinJS.Utilities.addClass(this.pageElement, "hidden");
                    WinJS.Utilities.removeClass(this._progressElement, "hidden");
                },

                onViewDataLoaded: function () {
                    WinJS.Utilities.removeClass(this.pageElement, "hidden");
                    WinJS.Utilities.addClass(this._progressElement, "hidden");
                },

                // Responds to navigation by adding new pages to the DOM. 
                _navigating: function (args) {
                    var newElement = this._createPageElement();

                    this._element.appendChild(newElement);
                    this._element.appendChild(this._progressElement);

                    this._lastNavigationPromise.cancel();

                    var that = this;

                    function cleanup() {
                        if (that._element.childElementCount > 1) {
                            var oldElement = that._element.firstElementChild;
                            // Cleanup and remove previous element 
                            if (oldElement.winControl) {
                                oldElement.winControl.viewModel.addEventListener("data", that.onViewDataSet.bind(that));
                                oldElement.winControl.viewModel.addEventListener("loaded", that.onViewDataLoaded.bind(that));

                                if (oldElement.winControl.unload) {
                                    oldElement.winControl.unload();
                                }
                                oldElement.winControl.dispose();
                            }
                            oldElement.parentNode.removeChild(oldElement);
                            oldElement.innerText = "";
                        }
                    }

                    this._lastNavigationPromise = WinJS.Promise.as().then(function () {
                        return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state);
                    }).then(cleanup, cleanup).then(function () {
                        var messageService = MetroNode.sdk.main.getComponent("messageService");

                        that.pageControl.viewModel.addEventListener("data", that.onViewDataSet.bind(that));
                        that.pageControl.viewModel.addEventListener("loaded", that.onViewDataLoaded.bind(that));

                        WinJS.Utilities.addClass(that.pageElement, "hidden");
                        WinJS.Utilities.removeClass(that._progressElement, "hidden");

                        messageService.send("NavigatingMessage", {
                            url: args.detail.location,
                            view: that.pageControl,
                            viewModel: that.pageControl.viewModel,
                            state: args.detail.state
                        });
                    });

                    args.detail.setPromise(this._lastNavigationPromise);
                },

                // Responds to resize events and call the updateLayout function
                // on the currently loaded page.
                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
                    }
                },
            }
        )
    });
})();
