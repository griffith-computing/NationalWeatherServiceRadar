(function () {
    "use strict"

    WinJS.Namespace.define("Constants", {
        LayerOptionConstants: WinJS.Class.define(
            function LayerOptionConstants() {
            }, {
            }, {
                TOPOGRAPHY_LAYER: "topo",
                COUNTIES_LAYER: "counties",
                RIVERS_LAYER: "rivers",
                HIGHWAY_LAYER: "highways",
                CITIES_LAYER: "cities",
                RADAR_LAYER: "radar",
                WARNINGS_LAYER: "warnings",
                LEGEND_LAYER: "legend"
            })
    });
})();