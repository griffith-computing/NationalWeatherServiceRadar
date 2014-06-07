/// <reference path="/js/builders/OverlaysUrlBuilder.js" />
(function () {
    "use strict"

    WinJS.Namespace.define("Renderers", {
        HighwayLayerRenderer: WinJS.Class.define(
            function CountiesLayerRenderer() {
                this._overlaysUrlBuilder = new Builders.OverlaysUrlBuilder();
                this._highwayImage = new Image();
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
                    this._highwayImage.isLoaded = true;
                    this.getCanvasRenderingContext().drawImage(this._highwayImage, 0, 0);
                },

                _loadRadarImage: function () {
                    this._clearCanvas();

                    if (this.getRadarSiteId() == null) {
                        return;
                    }

                    var loading = false;

                    if (!this._highwayImage.isLoaded) {
                        loading = true;
                        this._highwayImage.onload = this._renderRadarImage.bind(this);
                        this._highwayImage.src = this._overlaysUrlBuilder.getShortRangeHighwaysOverlayForRadarSite(this.getRadarSiteId());
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
                    this._highwayImage.isLoaded = false;
                }
            }, {
            })
    })
})();