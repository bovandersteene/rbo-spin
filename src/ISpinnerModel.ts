import IAugmentedJQuery = angular.IAugmentedJQuery;
export interface ISpinnerModel {
    options: SpinnerOptions;
    start(): void;
    stop(): void;
}