config.$inject = ["$httpProvider"];
function config($httpProvider) {
    function interceptor(q, spinModel) {
        return {
            request: function (config) {
                spinModel.start();
                return config;
            },
            response: function (response) {
                spinModel.stop();
                return response;
            },
            responseError: function (rejection) {
                spinModel.stop();
                return q.reject(rejection);
            }
        };
    }
    interceptor.$inject = ["$q", "rboSpinModel"];
    $httpProvider.interceptors.push(interceptor);
}
exports.config = config;
//# sourceMappingURL=httpSpinner.js.map