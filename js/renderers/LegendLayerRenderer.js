/// <reference path="/js/consts/RadarImageConstants.js" />
/// <reference path="/js/builders/LegendUrlBuilder.js" />
(function () {
    "use strict"

    WinJS.Namespace.define("Renderers", {
        LegendLayerRenderer: WinJS.Class.define(
            function LegendLayerRenderer() {
                this._legendUrlBuilder = new Builders.LegendUrlBuilder();

                this._baseReflectivityLegendImage = new Image();
                this._stormRelativeMotionLegendImage = new Image();
                this._baseVelocityLegendImage = new Image();
                this._oneHourPrecipitationLegendImage = new Image();
                this._compositeReflectivityLegendImage = new Image();
                this._stormTotalPrecipitationLegendImage = new Image();

                this._canvasRenderingContext = null;
                this._radarSiteId = "";
                this._radarImage = "";
                this._visible = false;
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
                    this._clearLegendImages();

                    if (this.getVisible()) {
                        this._renderLegend();
                    }
                },

                getVisible: function () {
                    return this._visible;
                },
                setVisible: function (value) {
                    this._visible = value;

                    if (this.getVisible()) {
                        this._renderLegend();
                    } else {
                        this._clearCanvas();
                    }
                },
                
                getRadarImage: function () {
                    return this._radarImage;
                },
                setRadarImage: function (value) {
                    this._radarImage = value;
                    
                    if (this.getVisible()) {
                        this._renderLegend();
                    } 
                },

                _clearLegendImages: function () {
                    this._baseReflectivityLegendImage.isLoaded = false;
                    this._stormRelativeMotionLegendImage.isLoaded = false;
                    this._baseVelocityLegendImage.isLoaded = false;
                    this._oneHourPrecipitationLegendImage.isLoaded = false;
                    this._compositeReflectivityLegendImage.isLoaded = false;
                    this._stormTotalPrecipitationLegendImage.isLoaded = false;
                },

                _clearCanvas: function () {
                    if (this.getCanvasRenderingContext() == null) {
                        return;
                    }

                    var width = this.getCanvasRenderingContext().canvas.width;
                    var height = this.getCanvasRenderingContext().canvas.height;
                    this.getCanvasRenderingContext().clearRect(0, 0, width, height);
                },

                _renderLegend: function () {
                    this._clearCanvas();
                    this._loadLegendImage(this.getRadarImage());
                },

                _loadLegendImage: function (radarImage) {
                    var loading = false;

                    switch (radarImage) {
                        case Constants.RadarImageConstants.BASE_REFLECTIVITY:
                            if (!this._baseReflectivityLegendImage.isLoaded) {
                                loading = true;
                                this._baseReflectivityLegendImage.onload = this._renderLegendImage.bind(this, radarImage);
                                this._baseReflectivityLegendImage.src = this._legendUrlBuilder.buildCurrentShortRangeBaseReflectivityLegendUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.STORM_RELATIVE_MOTION:
                            if (!this._stormRelativeMotionLegendImage.isLoaded) {
                                loading = true;
                                this._stormRelativeMotionLegendImage.onload = this._renderLegendImage.bind(this, radarImage);
                                this._stormRelativeMotionLegendImage.src = this._legendUrlBuilder.buildCurrentStormRelativeMotionLegendUrlFromRadarSite(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.BASE_VELOCITY:
                            if (!this._baseVelocityLegendImage.isLoaded) {
                                loading = true;
                                this._baseVelocityLegendImage.onload = this._renderLegendImage.bind(this, radarImage);
                                this._baseVelocityLegendImage.src = this._legendUrlBuilder.buildCurrentBaseVelocityLegendUrlFromRadarSite(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.ONE_HOUR_PRECIPITATION:
                            if (!this._oneHourPrecipitationLegendImage.isLoaded) {
                                loading = true;
                                this._oneHourPrecipitationLegendImage.onload = this._renderLegendImage.bind(this, radarImage);
                                this._oneHourPrecipitationLegendImage.src = this._legendUrlBuilder.buildCurrentOneHourPrecipitationLegendUrlFromRadarSite(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.COMPOSITE_REFLECTIVITY:                            
                            if (!this._compositeReflectivityLegendImage.isLoaded) {
                                loading = true;
                                this._compositeReflectivityLegendImage.onload = this._renderLegendImage.bind(this, radarImage);
                                this._compositeReflectivityLegendImage.src = this._legendUrlBuilder.buildCurrentCompositeReflectivityLegendUrlFromRadarSite(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.STORM_TOTAL_PRECIPITATION:
                            if (!this._stormTotalPrecipitationLegendImage.isLoaded) {
                                loading = true;
                                this._stormTotalPrecipitationLegendImage.onload = this._renderLegendImage.bind(this, radarImage);
                                this._stormTotalPrecipitationLegendImage.src = this._legendUrlBuilder.buildCurrentStormTotalPrecipitationLegendUrlFromRadarSite(this.getRadarSiteId());
                            }
                            break;
                        default:
                            break;
                    }

                    if (!loading) {
                        this._renderLegendImage(radarImage);
                    }
                },

                _renderLegendImage: function (radarImage) {
                    switch (radarImage) {
                        case Constants.RadarImageConstants.BASE_REFLECTIVITY:
                            this._baseReflectivityLegendImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this._baseReflectivityLegendImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.STORM_RELATIVE_MOTION:
                            this._stormRelativeMotionLegendImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this._stormRelativeMotionLegendImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.BASE_VELOCITY:
                            this._baseVelocityLegendImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this._baseVelocityLegendImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.ONE_HOUR_PRECIPITATION:
                            this._oneHourPrecipitationLegendImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this._oneHourPrecipitationLegendImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.COMPOSITE_REFLECTIVITY:
                            this._compositeReflectivityLegendImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this._compositeReflectivityLegendImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.STORM_TOTAL_PRECIPITATION:
                            this._stormTotalPrecipitationLegendImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this._stormTotalPrecipitationLegendImage, 0, 0);
                            break;
                    }
                }
            }, {
            })
    });
})();