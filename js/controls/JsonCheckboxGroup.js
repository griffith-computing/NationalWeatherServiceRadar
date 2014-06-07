(function () {
    "use strict"

    WinJS.Namespace.define("Controls", {
        JsonCheckboxGroup: WinJS.Class.define(
            function JsonCheckboxGroup(element) {
                this.element = element || document.createElement("div");
                this.element.winControl = this;

                this._dataSource = null;

                this._selectedItems = [];

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
                    
                    var cEvt = document.createEvent("Event");
                    var checked = evt.currentTarget.checked;
                    var value = evt.currentTarget.value;

                    /*if (checked) {
                        this._selectedItems.push(evt.currentTarget.value);
                    } else {
                        var index = this._selectedItems.indexOf(evt.currentTarget.value);
                        this._selectedItems.splice(index, 1);
                    }*/
                    
                    cEvt.initEvent("OnChange", true, false);
                    cEvt.data = {};
                    cEvt.data.value = value;
                    cEvt.data.isSelected = checked;

                    this.element.dispatchEvent(cEvt);
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