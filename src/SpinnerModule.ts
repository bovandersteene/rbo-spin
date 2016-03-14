import "angular";
import "spin";

import IModule = angular.IModule;

import {config as httpSpinnerConfig} from "./httpSpinner";
import {SpinnerModel} from "./SpinnerModel";
import {SpinComponent} from "./SpinComponent";


export const SpinnerModule: IModule = angular.module("reibo.spin", [])
    .service("rboSpinModel", SpinnerModel)
    .component("rboSpin", new SpinComponent())
    .config(httpSpinnerConfig)
    ;
