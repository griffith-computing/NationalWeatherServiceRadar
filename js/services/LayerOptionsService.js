(function () {
    "use strict"

    WinJS.Namespace.define("Services", {
        LayerOptionsService: WinJS.Class.define(
            function LayerOptionsService() {
                this._layerOptionsUrl = "/assets/json/layer_options.json";
                this._parser = new Parsers.JsonParser();
                this._request = { url: this._layerOptionsUrl };
            }, {
                getLayerOptions: function () {
                    var promise = WinJS.xhr(this._request);
                    return promise.then(this._parser.parse);
                }
            }, {
            })
    })
})();