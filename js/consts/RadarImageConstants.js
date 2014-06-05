(function () {
    "use strict"

    WinJS.Namespace.define("Constants", {
        RadarImageConstants: WinJS.Class.define(
            function RadarImageConstants() {
            }, {                
            }, {
                BASE_REFLECTIVITY: "base_reflectivity",
                STORM_RELATIVE_MOTION: "storm_relative_motion",
                BASE_VELOCITY: "base_velocity",
                ONE_HOUR_PRECIPITATION: "one_hour_precipitation",
                COMPOSITE_REFLECTIVITY: "composite_reflectivity",
                STORM_TOTAL_PRECIPITATION: "storm_total_precipitation"
            })
    });
})();