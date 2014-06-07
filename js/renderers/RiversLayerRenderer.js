/// <reference path="/js/builders/OverlaysUrlBuilder.js" />
(function () {
    "use strict"

    WinJS.Namespace.define("Renderers", {
        RiversLayerRenderer: WinJS.Class.define(
            function CountiesLayerRenderer() {
                this._overlaysUrlBuilder = new Builders.OverlaysUrlBuilder();
                this._riversImage = new Image();
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
                    this._riversImage.isLoaded = true;
                    this.getCanvasRenderingContext().drawImage(this._riversImage, 0, 0);
                },

                _loadRadarImage: function () {
                    this._clearCanvas();

                    if (this.getRadarSiteId() == null) {
                        return;
                    }

                    var loading = false;

                    if (!this._riversImage.isLoaded) {
                        loading = true;
                        this._riversImage.onload = this._renderRadarImage.bind(this);
                        this._riversImage.src = this._overlaysUrlBuilder.getShortRangeRiversOverlayForRadarSite(this.getRadarSiteId());
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
                    this._riversImage.isLoaded = false;
                }
            }, {
            })
    })
})();