// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
/// <reference path="/js/renderers/RadarImageRenderer.js" />
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var img = new Image();
    var locationService = new Services.LocationService();
    var radarOptionsService = new Services.RadarOptionsService();
    var layerOptionsService = new Services.LayerOptionsService();
    var radarImageRenderer = new Renderers.RadarImageRenderer();


    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function completed() {
                //img.onload = imgLoaded.bind(this);
                //img.src = "http://radar.weather.gov/ridge/RadarImg/N0R/FWS_N0R_0.gif";

                locationService.getLocations().done(function (result) {

                    var locations = document.getElementById("locationsSelect").winControl;
                    locations.valueField("wfo_sid");
                    locations.textField("rda_location");
                    locations.dataSource(result);
                });

                radarOptionsService.getRadarOptions().done(function (result) {
                    var radarOptionsDom = document.getElementById("radarOptionsSelect");
                    var radarOptions = radarOptionsDom.winControl;
                    radarOptions.valueField("value");
                    radarOptions.textField("name");
                    radarOptions.dataSource(result);                    
                });

                layerOptionsService.getLayerOptions().done(function (result) {
                    var layerOptionsDom = document.getElementById("layerOptionsGroup");
                    var layerOptions = layerOptionsDom.winControl;
                    layerOptions.dataSource(result);
                });
                
                radarImageRenderer.setVisible(true);
                radarImageRenderer.setCanvasRenderingContext(document.getElementById("radarCanvas").getContext("2d"))
                WinJS.Application.addEventListener("OnSelectEvent", jsonSelectOnSelectHandler.bind(this));
            }));
        }
    };

    function imgLoaded() {
        var canvas = document.getElementById("cvs");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    };

    function updateRenderLocations(locationId) {
        radarImageRenderer.setRadarSiteId(locationId);
    };

    function updateRadarImageRendererImageType(imageType) {
        radarImageRenderer.setRadarImageType(imageType);
    };

    function radarOptionsOnSelectHandler(evt) {
        //console.log(evt);
        updateRadarImageRendererImageType(evt.value);
    };

    function locationsSelectOnSelectHandler(evt) {
        updateRenderLocations(evt.value)
    };

    function jsonSelectOnSelectHandler(evt) {
        console.log(evt);

        switch (evt.detail.id)
        {
            case "radarOptionsSelect":
                radarOptionsOnSelectHandler.call(this, evt.detail);
                break;
            case "locationsSelect":
                locationsSelectOnSelectHandler.call(this, evt.detail);
                break;
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
