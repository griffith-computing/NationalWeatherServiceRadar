(function () {
    "use strict"

    WinJS.Namespace.define("Controls", {
        JsonCheckboxGroup: WinJS.Class.define(
            function JsonCheckboxGroup(element) {
                this.element = element || document.createElement("div");
                this.element.winControl = this;

                this._dataSource = null;

                this._bindToDataSource = function (ds) {
                    this._dataSource.forEach(this._forEachHandler.bind(this));
                };

                this._forEachHandler = function (element, index, array) {
                    var chkbx = this._createCheckboxForElement(element);
                    var lbl = this._createLabelForElement(element);
                    var div = this._createDivForChildren(chkbx, lbl);
                    

                    this.element.appendChild(div);
                };

                this._createCheckboxForElement = function (element) {
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = element["value"];
                    checkbox.addEventListener("change", this._checkboxSelectedHandler.bind(this));
                    return checkbox;
                };

                this._createLabelForElement = function (element) {
                    var lbl = document.createElement("label");
                    lbl.textContent = element["name"];
                    return lbl;
                };

                this._createDivForChildren = function (checkbox, label) {
                    var div = document.createElement("div");
                    div.className = "checkboxDiv";
                    div.appendChild(checkbox);
                    div.appendChild(label);
                    return div;
                };

                this._checkboxSelectedHandler = function (evt) {
                    
                    var evt = new CustomEvent(
                       "OnChangeEvent",
                       {
                           detail: {
                               value: evt.currentTarget.value,
                               isChecked: evt.currentTarget.checked
                           },
                           bubbles: true,
                           cancelable: true
                       });

                    this.element.dispatchEvent(evt);
                };
            }, {
                dataSource: function (value) {
                    if (value == null) {
                        return this._dataSource;
                    }

                    this._dataSource = value;
                    this._bindToDataSource(value);
                }
            }, {

            })
    });
})();