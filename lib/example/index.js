require("angular");
require("rbo-spin");
exports.spinnerExampleModule = angular.module("reibo.spin.example", [
    "reibo.spin"
]);
angular.bootstrap(document, [exports.spinnerExampleModule.name], {
    strictDi: true
});
//# sourceMappingURL=index.js.map