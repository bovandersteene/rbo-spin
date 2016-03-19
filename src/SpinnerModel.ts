import {ISpinnerModel} from "./ISpinnerModel";
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IDocumentService = angular.IDocumentService;
import * as Spinner from "spin";

export class SpinnerModel implements ISpinnerModel {
    public static $inject: Array<string> = ["$document"];
    public options: SpinnerOptions = {
        top: "50",
        left: "50",
        scale: 3
    };
    private element: IAugmentedJQuery;
    private spinner: Spinner;
    private totalRuns: number = 0;

    constructor(private document: IDocumentService) {
        this.element = document.find("rbo-spin");
    }

    public start(): void {
        if (this.totalRuns === 0) {
            console.log(this.options)
            this.spinner = new Spinner({
                lines: 13 // The number of lines to draw
                , length: 28 // The length of each line
                , width: 14 // The line thickness
                , radius: 42 // The radius of the inner circle
                , scale: 3 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#000' // #rgb or #rrggbb or array of colors
                , opacity: 0.25 // Opacity of the lines
                , rotate: 0 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 60 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '50%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            }).spin();
            this.element.append(this.spinner.el);
        }

        this.totalRuns++;
    }

    public stop(): void {
        this.totalRuns--;
        if (this.totalRuns === 0) {
            this.spinner.spin();
        }
    }
}