/// <reference path="/js/builders/WarningsUrlBuilder.js" />
(function () {
    "use strict"

    WinJS.Namespace.define("Renderers", {
        WarningsLayerRenderer: WinJS.Class.define(
            function WarningsLayerRenderer() {
                this._warningsUrlBuilder = new Builders.WarningsUrlBuilder();
                this._warningImage = new Image();
                this._visible = false;
                this._radarSiteId = "";
                this._canvasRenderingContext = null;
            }, {
                /* Instance Methods */
                getCanvasRenderingContext: function () {
                    return this._canvasRenderingContext;
                },
                setCanvasRenderingContext: function (value) {
                    if (value == this._canvasRenderingContext) {
                        return;
                    }

                    this._canvasRenderingContext = value;
                },
                getRadarSiteId: function () {
                    return this._radarSiteId;
                },
                setRadarSiteId: function (value) {
                    this._radarSiteId = value;
                    this._clearRadarImages();

                    if (this.getVisible()) {
                        this._loadRadarImage();
                    }
                },

                getVisible: function () {
                    return this._visible;
                },
                setVisible: function (value) {
                    this._visible = value;

                    if (this.getVisible()) {
                        this._loadRadarImage();
                    } else {
                        this._clearCanvas();
                    }
                },

                _renderRadarImage: function () {
                    this._warningImage.isLoaded = true;
                    this.getCanvasRenderingContext().drawImage(this._warningImage, 0, 0);
                },

                _loadRadarImage: function () {
                    this._clearCanvas();

                    if (this.getRadarSiteId() == null) {
                        return;
                    }

                    var loading = false;

                    if (!this._warningImage.isLoaded) {
                        loading = true;
                        this._warningImage.onload = this._renderRadarImage.bind(this);
                        this._warningImage.src = this._warningsUrlBuilder.buildCurrentShortWarningsUrlFromRadarSiteId(this.getRadarSiteId());
                    }

                    if (!loading)
                        this._renderRadarImage();
                },

                _clearCanvas: function () {
                    if (this.getCanvasRenderingContext() == null) {
                        return;
                    }

                    var width = this.getCanvasRenderingContext().canvas.width;
                    var height = this.getCanvasRenderingContext().canvas.height;
                    this.getCanvasRenderingContext().clearRect(0, 0, width, height);
                },

                _clearRadarImages: function () {
                    this._warningImage.isLoaded = false;
                }
            }, {
            })
    })
})();