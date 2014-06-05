(function () {
    "use strict"

    WinJS.Namespace.define("Controls", {
        JsonSelect: WinJS.Class.define(
            function JsonSelect(element) {
                this.element = element || document.createElement("div");
                this.element.winControl = this;

                this.select = document.createElement("select");
                this.element.appendChild(this.select);
                
                this._ds = null;
                this._textField = "";
                this._valueField = "";
                
                this._bindToDataSource = function () {
                    if (this._textField == "" || this._valueField == "" || this._ds == null) {
                        return;
                    }

                    this._ds.forEach(this._forEachHandler.bind(this))
                };

                this._forEachHandler = function (element, index, array) {
                    var opt = document.createElement("option");
                    opt.value = element[this._valueField];
                    opt.text = element[this._textField];
                    this.select.add(opt);
                };

                this._selectOnChangeHandler = function (e) {
                    //this.element.dispatchEvent();
                    console.log(this.select.value);
                    
                    var detail = {};
                    detail.id = this.element.id;
                    detail.value = this.select.value;

                    var evt = {};
                    evt.type = "OnSelectEvent";
                    evt.detail = detail;

                    WinJS.Application.queueEvent(evt);
                    /*var evt = new CustomEvent(
                        "OnSelectEvent",
                        {
                            detail: {
                                value: this.select.value
                            },
                            bubbles: true,
                            cancelable: true
                        });

                    this.element.dispatchEvent(evt);*/
                };

                this.select.addEventListener("change", this._selectOnChangeHandler.bind(this));
            }, {
                dataSource: function(value){
                    if (value == null){
                        return this._ds;
                    }

                    this._ds = value;
                    this._bindToDataSource();
                },
                valueField: function(value) {
                    if (value == null) {
                        return this._valueField;
                    }

                    this._valueField = value;
                },
                textField: function(value) {
                    if (value == null){
                        return this._textField;
                    }

                    this._textField = value;
                }
            }, {
            })
    });
})();