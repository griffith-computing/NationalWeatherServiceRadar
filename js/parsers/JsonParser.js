(function () {
    "use strict"

    WinJS.Namespace.define("Parsers", {
        JsonParser: WinJS.Class.define(
            function JsonParser() {

            }, {
                parse: function (result) {
                    return JSON.parse(result.response);
                }
            }, {
            })
    });
})();