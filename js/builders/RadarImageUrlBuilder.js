(function () {
    "use strict"

    WinJS.Namespace.define("Builders", {
        RadarImageUrlBuilder: WinJS.Class.define(
            function RadarImageUrlBuilder() {
                this.baseUrl = "http://radar.weather.gov/ridge";
                this.radarImagesDirectory = "/RadarImg";
                this.baseRadarImagesDirectory = this.baseUrl + this.radarImagesDirectory;
                this.shortRangeBaseReflectivityImageIdDirectory = "/N0R";
                this.stormRelativeMotionImageIdDirectory = "/N0S";
                this.baseVelocityImageIdDirectory = "/N0V";
                this.oneHourPrecipitationImageIdDirectory = "/N1P";
                this.compositeReflectivityImageIdDirectory = "/NCR";
                this.stormTotalPrecipitationImageIdDirectory = "/NTP";
            }, {
                buildCurrentShortRangeBaseReflectivityUrlFromRadarSiteId: function (siteId) {
                    return this.baseRadarImagesDirectory +
                        this.shortRangeBaseReflectivityImageIdDirectory +
                        "/" + siteId + "_N0R_0.gif";
                },
                buildCurentStormRelativeMotionUrlFromRadarSiteId: function (siteId) {
                    return this.baseRadarImagesDirectory +
                        this.stormRelativeMotionImageIdDirectory +
                        "/" + siteId + "_N0S_0.gif";
                },
                buildCurrentBaseVelocityUrlFromRadarSiteId: function (siteId) {
                    return this.baseRadarImagesDirectory +
                        this.baseVelocityImageIdDirectory +
                        "/" + siteId + "_N0V_0.gif";
                },
                buildCurrentOneHourPrecipitationUrlFromRadarSiteId: function (siteId) {
                    return this.baseRadarImagesDirectory +
                        this.oneHourPrecipitationImageIdDirectory +
                        "/" + siteId + "_N1P_0.gif";
                },
                buildCurrentCompositeReflectivityUrlFromRadarSiteId: function (siteId) {
                    return this.baseRadarImagesDirectory +
                        this.compositeReflectivityImageIdDirectory +
                        "/" + siteId + "_NCR_0.gif";
                },
                buildCurrentStormTotalPrecipitationUrlFromRadarSiteId: function (siteId) {
                    return this.baseRadarImagesDirectory +
                        this.stormTotalPrecipitationImageIdDirectory +
                        "/" + siteId + "_NTP_0.gif";
                }
            }, {
            })
    })
})();