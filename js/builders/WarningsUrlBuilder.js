(function () {
    "use strict"

    WinJS.Namespace.define("Builders", {
        WarningsUrlBuilder: WinJS.Class.define(
            function WarningsUrlBuilder() {
                this.baseUrl = "http://radar.weather.gov/ridge";
                this.warningsDirectory = "/Warnings";
                this.shortDirectory = "/Short";
                this.baseShortWarningsImagesDirectory = this.baseUrl + this.warningsDirectory + this.shortDirectory;

            }, {
                buildCurrentShortWarningsUrlFromRadarSiteId: function (radarSiteId) {
                    return this.baseShortWarningsImagesDirectory + "/" + radarSiteId + "_Warnings_0.gif";
                }
            }, {
            })
    });
})();