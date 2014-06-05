(function () {
    "use strict"

    WinJS.Namespace.define("Services", {
        RadarOptionsService: WinJS.Class.define(
            function RadarOptionsService() {
                this._radarOptionsUrl = "/assets/json/radar_options.json";
                this._parser = new Parsers.JsonParser();
                this._request = { url: this._radarOptionsUrl };
            }, {
                getRadarOptions: function () {
                    var promise = WinJS.xhr(this._request);
                    return promise.then(this._parser.parse);
                }
            }, {
            })
    });
})();