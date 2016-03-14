import "angular";
import "rbo-spin";

import IModule = angular.IModule;

export const spinnerExampleModule: IModule = angular.module("reibo.spin.example", [
        "reibo.spin"
]);

angular.bootstrap(document, [spinnerExampleModule.name], {
    strictDi: true
});