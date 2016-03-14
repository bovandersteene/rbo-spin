require("angular");
require("spin");
var httpSpinner_1 = require("./httpSpinner");
var SpinnerModel_1 = require("./SpinnerModel");
var SpinComponent_1 = require("./SpinComponent");
exports.SpinnerModule = angular.module("reibo.spin", [])
    .service("rboSpinModel", SpinnerModel_1.SpinnerModel)
    .component("rboSpin", new SpinComponent_1.SpinComponent())
    .config(httpSpinner_1.config);
//# sourceMappingURL=SpinnerModule.js.map