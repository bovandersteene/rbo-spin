var Spinner = require("spin");
var SpinnerModel = (function () {
    function SpinnerModel(document) {
        this.document = document;
        this.options = {
            top: "50",
            left: "50",
            scale: 3
        };
        this.totalRuns = 0;
        this.element = document.find("rbo-spin");
        this.start();
    }
    SpinnerModel.prototype.start = function () {
        if (this.totalRuns === 0) {
            console.log(this.options);
            this.spinner = new Spinner({
                lines: 13,
                length: 28,
                width: 14,
                radius: 42,
                scale: 3,
                corners: 1,
                color: '#000',
                opacity: 0.25,
                rotate: 0,
                direction: 1,
                speed: 1,
                trail: 60,
                fps: 20,
                zIndex: 2e9,
                className: 'spinner',
                top: '50%',
                left: '50%',
                shadow: false,
                hwaccel: false,
                position: 'absolute'
            }).spin();
            this.element.append(this.spinner.el);
        }
        this.totalRuns++;
    };
    SpinnerModel.prototype.stop = function () {
        this.totalRuns--;
        if (this.totalRuns === 0) {
            this.spinner.spin();
        }
    };
    SpinnerModel.$inject = ["$document"];
    return SpinnerModel;
})();
exports.SpinnerModel = SpinnerModel;
//# sourceMappingURL=SpinnerModel.js.map