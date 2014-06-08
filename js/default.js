// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
/// <reference path="/js/renderers/RadarImageRenderer.js" />
/// <reference path="/js/renderers/TopographyLayerRenderer.js" />
/// <reference path="/js/renderers/CountiesLayerRenderer.js" />
/// <reference path="/js/renderers/RiversLayersRenderer.js" />
/// <reference path="/js/renderers/HighwayLayersRenderer.js" />
/// <reference path="/js/renderers/CitiesLayerRenderer.js" />
/// <reference path="/js/renderers/WarningsLayerRenderer.js" />
/// <reference path="/js/consts/LayerOptionConstants.js" />
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
    var riversImageRenderer = new Renderers.RiversLayerRenderer();
    var topoImageRenderer = new Renderers.TopographyLayerRenderer();
    var countiesImageRenderer = new Renderers.CountiesLayerRenderer();
    var highwayImageRenderer = new Renderers.HighwayLayerRenderer();
    var citiesImageRenderer = new Renderers.CitiesLayerRenderer();
    var warningsImageRenderer = new Renderers.WarningsLayerRenderer();

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
                    layerOptionsDom.addEventListener("OnChange", layerOptionsOnChangeHandler.bind(this));
                });
                
                //radarImageRenderer.setVisible(true);
                radarImageRenderer.setCanvasRenderingContext(document.getElementById("radarCanvas").getContext("2d"));
                topoImageRenderer.setCanvasRenderingContext(document.getElementById("topoCanvas").getContext("2d"));
                riversImageRenderer.setCanvasRenderingContext(document.getElementById("riversCanvas").getContext("2d"));
                countiesImageRenderer.setCanvasRenderingContext(document.getElementById("countiesCanvas").getContext("2d"));
                highwayImageRenderer.setCanvasRenderingContext(document.getElementById("highwaysCanvas").getContext("2d"));
                citiesImageRenderer.setCanvasRenderingContext(document.getElementById("citiesCanvas").getContext("2d"));
                warningsImageRenderer.setCanvasRenderingContext(document.getElementById("warningsCanvas").getContext("2d"));

                WinJS.Application.addEventListener("OnSelectEvent", jsonSelectOnSelectHandler.bind(this));
            }));
        }
    };

    function layerOptionsOnChangeHandler(evt) {
        console.log(evt);
        var selected = evt.data.isSelected;
        var value = evt.data.value;

        switch (value) {
            case Constants.LayerOptionConstants.TOPOGRAPHY_LAYER:
                topoImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.COUNTIES_LAYER:
                countiesImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.RIVERS_LAYER:
                riversImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.HIGHWAY_LAYER:
                highwayImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.CITIES_LAYER:
                citiesImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.RADAR_LAYER:
                radarImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.WARNINGS_LAYER:
                warningsImageRenderer.setVisible(selected);
                break;
            case Constants.LayerOptionConstants.LEGEND_LAYER:
                break;
        }
    }

    function imgLoaded() {
        var canvas = document.getElementById("cvs");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    };

    function updateRenderLocations(locationId) {
        radarImageRenderer.setRadarSiteId(locationId);
        topoImageRenderer.setRadarSiteId(locationId);
        countiesImageRenderer.setRadarSiteId(locationId);
        riversImageRenderer.setRadarSiteId(locationId);
        highwayImageRenderer.setRadarSiteId(locationId);
        citiesImageRenderer.setRadarSiteId(locationId);
        warningsImageRenderer.setRadarSiteId(locationId);
    };

    function updateRadarImageRendererImageType(imageType) {
        radarImageRenderer.setRadarImageType(imageType);
    };

    function radarOptionsOnSelectHandler(evt) {
        //console.log(evt);
        updateRadarImageRendererImageType(evt.value);
    };

    function locationsSelectOnSelectHandler(evt) {
        updateRenderLocations(evt.value);
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
