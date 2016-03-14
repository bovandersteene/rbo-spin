import IHttpProvider = angular.IHttpProvider;
import IRequestConfig = angular.IRequestConfig;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import IQService = angular.IQService;
import {ISpinnerModel} from "./ISpinnerModel";
config.$inject = ["$httpProvider"];

export function config($httpProvider: IHttpProvider): void {
    function interceptor(q: IQService, spinModel: ISpinnerModel): any {
        return {
            request: function (config: IRequestConfig): IRequestConfig {
                spinModel.start();
                return config;
            },
            response: function (response: IHttpPromiseCallbackArg<any>): IHttpPromiseCallbackArg<any> {
                spinModel.stop();
                return response;
            },
            responseError: function (rejection: IHttpPromiseCallbackArg<any>): IHttpPromiseCallbackArg<any> {
                spinModel.stop();
                return q.reject(rejection);
            }
        };
    }

    interceptor.$inject = ["$q", "rboSpinModel"];
    $httpProvider.interceptors.push(interceptor);

}