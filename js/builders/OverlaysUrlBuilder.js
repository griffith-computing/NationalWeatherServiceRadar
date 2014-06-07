(function () {
    "use strict"

    WinJS.Namespace.define("Builders", {
        OverlaysUrlBuilder: WinJS.Class.define(
            function OverlaysUrlBuilder() {
                this.baseUrl = "http://radar.weather.gov/ridge";
                this.overlaysUrl = this.baseUrl + "/Overlays";
                this.topoOverlayUrl = this.overlaysUrl + "/Topo";
                this.countyOverlayUrl = this.overlaysUrl + "/County";
                this.riversOverlayUrl = this.overlaysUrl + "/Rivers";
                this.highwaysOverlayUrl = this.overlaysUrl + "/Highways";
                this.citiesOverlayUrl = this.overlaysUrl + "/Cities";
                this.shortUrlFragment = "/Short";
                this.longUrlFragment = "/Long";
                this.extension = ".gif";
            }, {
                /* Instance Methods */
                getShortRangeTopoOverlayForRadarSite: function (radarSite) {
                    var url = this.topoOverlayUrl;
                    url += this.shortUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_Topo_Short.jpg";

                    return url;
                },
                getLongRangeTopoOverlayForRadarSite: function (radarSite) {
                    var url = this.topoOverlayUrl;
                    url += this.longUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_Topo_Long.jpg";

                    return url;
                },
                getShortRangeCountyOverlayForRadarSite: function (radarSite) {
                    var url = this.countyOverlayUrl;
                    url += this.shortUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_County_Short.gif";

                    return url;
                },
                getLongRangeCountyOverlayForRadarSite: function (radarSite) {
                    var url = this.countyOverlayUrl;
                    url += this.longUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_County_Long.gif";

                    return url;
                },
                getShortRangeRiversOverlayForRadarSite: function (radarSite) {
                    var url = this.riversOverlayUrl;
                    url += this.shortUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_Rivers_Short.gif";

                    return url;
                },
                getLongRangeRiversOverlayForRadarSite: function (radarSite) {
                    var url = this.riversOverlayUrl;
                    url += this.longUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_Rivers_Long.gif";

                    return url;
                },
                getShortRangeHighwaysOverlayForRadarSite: function (radarSite) {
                    var url = this.highwaysOverlayUrl;
                    url += this.shortUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_Highways_Short.gif";

                    return url;
                },
                getLongRangeHighwaysOverlayForRadarSite: function (radarSite) {
                    var url = this.highwaysOverlayUrl;
                    url += this.longUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_Highways_Long.gif";

                    return url;
                },
                getShortRangeCitiesOverlayForRadarSite: function (radarSite) {
                    var url = this.citiesOverlayUrl;
                    url += this.shortUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_City_Short.gif";

                    return url;
                },
                getLongRangeCitiesOverlayForRadarSite: function (radarSite) {
                    var url = this.citiesOverlayUrl;
                    url += this.longUrlFragment;
                    url += "/";
                    url += radarSite;
                    url += "_City_Long.gif";

                    return url;
                }
            }, {
                /* Static Methods */
            })
    });
})();