(function () {
    "use strict"

    WinJS.Namespace.define("Builders", {
        LegendUrlBuilder: WinJS.Class.define(
            function LegendUrlBuilder() {
                this.baseUrl = "http://radar.weather.gov/ridge";
                this.legendDirectory = "/Legend";
                this.baseLegendImageDirectory = this.baseUrl + this.legendDirectory;

                this.shortRangeBaseReflectivityImageIdDirectory = "/N0R";
                this.stormRelativeMotionImageIdDirectory = "/N0S";
                this.baseVelocityImageIdDirectory = "/N0V";
                this.oneHourPrecipitationImageIdDirectory = "/N1P";
                this.compositeReflectivityImageIdDirectory = "/NCR";
                this.stormTotalPrecipitationImageIdDirectory = "/NTP";
            }, {
                buildCurrentShortRangeBaseReflectivityLegendUrlFromRadarSiteId: function ( siteId ) {
                    return this.baseLegendImageDirectory +
                        this.shortRangeBaseReflectivityImageIdDirectory +
                        "/" + siteId + "_N0R_Legend_0.gif";
                },

                buildCurrentStormRelativeMotionLegendUrlFromRadarSite: function (siteId) {
                    return this.baseLegendImageDirectory +
                        this.stormRelativeMotionImageIdDirectory +
                        "/" + siteId + "_N0S_Legend_0.gif";
                },

                buildCurrentBaseVelocityLegendUrlFromRadarSite: function (siteId) {
                    return this.baseLegendImageDirectory +
                        this.baseVelocityImageIdDirectory +
                        "/" + siteId + "_N0V_Legend_0.gif";
                },

                buildCurrentOneHourPrecipitationLegendUrlFromRadarSite: function (siteId) {
                    return this.baseLegendImageDirectory +
                        this.oneHourPrecipitationImageIdDirectory +
                        "/" + siteId + "_N1P_Legend_0.gif";
                },

                buildCurrentCompositeReflectivityLegendUrlFromRadarSite: function (siteId) {
                    return this.baseLegendImageDirectory +
                        this.compositeReflectivityImageIdDirectory +
                        "/" + siteId + "_NCR_Legend_0.gif";
                }, 

                buildCurrentStormTotalPrecipitationLegendUrlFromRadarSite: function (siteId) {
                    return this.baseLegendImageDirectory +
                        this.stormTotalPrecipitationImageIdDirectory +
                        "/" + siteId + "_NTP_Legend_0.gif";
                }
            }, {
            })
    });
})();