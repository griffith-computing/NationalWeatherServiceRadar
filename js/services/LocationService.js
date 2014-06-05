(function () {
    "use strict"

    WinJS.Namespace.define("Services", {
        LocationService: WinJS.Class.define(
            function LocationService() {
                this._locationUrl = "/assets/json/locations.json";
                this._parser = new Parsers.JsonParser();
                this._request = { url: this._locationUrl };
            }, {
                getLocations: function () {
                    var promise = WinJS.xhr(this._request);
                    return promise.then(this._parser.parse);
                }
            }, {
            })
    });
})();