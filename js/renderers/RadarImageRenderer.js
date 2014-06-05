/// <reference path="/js/builders/RadarImageUrlBuilder.js" />
/// <reference path="/js/consts/RadarImageConstants.js" />

(function () {
    "use strict"

    WinJS.Namespace.define("Renderers", {
        RadarImageRenderer: WinJS.Class.define(
            function RadarImageRenderer() {
                this.radarImageUrlBuilder = new Builders.RadarImageUrlBuilder();
                this.baseReflectivityImage = new Image();
                this.stormRelativeMotionImage = new Image();
                this.baseVelocityImage = new Image();
                this.oneHourPrecipicationImage = new Image();
                this.compositeReflectivityImage = new Image();
                this.stormTotalPrecipicationImage = new Image();

                this.imageLoaded = false;
                this._radarSiteId = "";
                this._radarImageType = "";
                this._canvasRenderingContext = null;
                this._visible = false;
            }, {
                /* Instance Methods */
                getCanvasRenderingContext: function() {
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
                        this._loadRadarImage( this.getRadarImageType() );
                    }
                },
                getRadarImageType: function () {
                    return this._radarImageType;
                },
                setRadarImageType: function (value) {
                    if (value == this.getRadarImageType()) {
                        return;
                    }

                    this._radarImageType = value;

                    if (this.getVisible()) {
                        this._loadRadarImage(this.getRadarImageType());
                    }
                },

                getVisible: function () {
                    return this._visible;
                },
                setVisible: function (value) {
                    this._visible = true;

                    if (this.getVisible()) {
                        this._loadRadarImage(this.getRadarImageType());
                    } else {
                        this._clearCanvas();
                    }
                },

                _renderRadarImage: function (radarImage) {
                    switch (radarImage) {
                        case Constants.RadarImageConstants.BASE_REFLECTIVITY:
                            this.baseReflectivityImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this.baseReflectivityImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.STORM_RELATIVE_MOTION:
                            this.stormRelativeMotionImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this.stormRelativeMotionImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.BASE_VELOCITY:
                            this.baseVelocityImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this.baseVelocityImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.ONE_HOUR_PRECIPITATION:
                            this.oneHourPrecipicationImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this.oneHourPrecipicationImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.COMPOSITE_REFLECTIVITY:
                            this.compositeReflectivityImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this.compositeReflectivityImage, 0, 0);
                            break;
                        case Constants.RadarImageConstants.STORM_TOTAL_PRECIPITATION:
                            this.stormTotalPrecipicationImage.isLoaded = true;
                            this.getCanvasRenderingContext().drawImage(this.stormTotalPrecipicationImage, 0, 0);
                            break;
                    }
                },

                _loadRadarImage: function (radarImage) {
                    this._clearCanvas();

                    if (radarImage == null || this.getRadarSiteId() == null) {
                        return;
                    }

                    var loading = false;

                    switch (radarImage) {
                        case Constants.RadarImageConstants.BASE_REFLECTIVITY:
                            if (!this.baseReflectivityImage.isLoaded) {
                                loading = true;
                                this.baseReflectivityImage.onload = this._renderRadarImage.bind(this, radarImage);
                                this.baseReflectivityImage.src = this.radarImageUrlBuilder.buildCurrentBaseVelocityUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.STORM_RELATIVE_MOTION:
                            if (!this.stormRelativeMotionImage.isLoaded) {
                                loading = true;
                                this.stormRelativeMotionImage.onload = this._renderRadarImage.bind(this, radarImage);
                                this.stormRelativeMotionImage.src = this.radarImageUrlBuilder.buildCurrentStormTotalPrecipitationUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.BASE_VELOCITY:
                            if (!this.baseVelocityImage.isLoaded) {
                                loading = true;
                                this.baseVelocityImage.onload = this._renderRadarImage.bind(this, radarImage);
                                this.baseVelocityImage.src = this.radarImageUrlBuilder.buildCurrentBaseVelocityUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.ONE_HOUR_PRECIPITATION:
                            if (!this.oneHourPrecipicationImage.isLoaded) {
                                loading = true;
                                this.oneHourPrecipicationImage.onload = this._renderRadarImage.bind(this, radarImage);
                                this.oneHourPrecipicationImage.src = this.radarImageUrlBuilder.buildCurrentOneHourPrecipitationUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.COMPOSITE_REFLECTIVITY:
                            if (!this.compositeReflectivityImage.isLoaded) {
                                loading = true;
                                this.compositeReflectivityImage.onload = this._renderRadarImage.bind(this, radarImage);
                                this.compositeReflectivityImage.src = this.radarImageUrlBuilder.buildCurrentCompositeReflectivityUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                        case Constants.RadarImageConstants.STORM_TOTAL_PRECIPITATION:
                            if (!this.stormTotalPrecipicationImage.isLoaded) {
                                loading = true;
                                this.stormTotalPrecipicationImage.onload = this._renderRadarImage.bind(this, radarImage);
                                this.stormTotalPrecipicationImage.src = this.radarImageUrlBuilder.buildCurrentStormTotalPrecipitationUrlFromRadarSiteId(this.getRadarSiteId());
                            }
                            break;
                    }

                    if (!loading)
                        this._renderRadarImage(radarImage);
                },

                _clearCanvas: function () {
                    if (this.getCanvasRenderingContext() == null) {
                        return;
                    }

                    var width = this.getCanvasRenderingContext().canvas.width;
                    var height =  this.getCanvasRenderingContext().canvas.height;
                    this.getCanvasRenderingContext().clearRect(0, 0, width, height);
                },

                _clearRadarImages: function () {
                    this.baseReflectivityImage.isLoaded = false;
                    this.stormRelativeMotionImage.isLoaded = false;
                    this.baseVelocityImage.isLoaded = false;
                    this.oneHourPrecipicationImage.isLoaded = false;
                    this.compositeReflectivityImage.isLoaded = false;
                    this.stormTotalPrecipicationImage.isLoaded = false;
                }
            }, {
            })
    })
})();