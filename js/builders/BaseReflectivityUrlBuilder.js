(function () {
    "use strict"

    WinJS.Namespace.define("Builders", {
        BaseReflectivityUrlBuilder: WinJS.Class.define(
            function BaseReflectivityUrlBuilder() {
                // constructor
                this._baseUrl = "http://radar.weather.gov/ridge/RadarImg/";
                this._baseReflectivityID = "N0R";
                this._currentImageTimestamp = "_0";
                this._imageExtension = ".gif";
            }, {
                // instanceMethods
                
                getCurrentImageUrlForRadarSiteId: function (radarSiteId) {
                    var url = this._baseUrl + this._baseReflectivityID + "/" + radarSiteId + "_"
                    + this._baseReflectivityID + this._currentImageTimestamp + this._imageExtension;
                    return url;
                },

                getImageUrlForRadarSiteIdAtTimestamp: function (radarSiteId, timestamp) {

                }
            }, {
                // staticMethods
            }
        )
    });
})();