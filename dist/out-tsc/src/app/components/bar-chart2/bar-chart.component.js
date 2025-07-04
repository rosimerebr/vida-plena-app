import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let BarChartComponent = class BarChartComponent {
    constructor() {
        this.weekData = [];
    }
};
__decorate([
    Input()
], BarChartComponent.prototype, "weekData", void 0);
BarChartComponent = __decorate([
    Component({
        selector: 'app-bar-chart',
        templateUrl: './bar-chart.component.html',
        styleUrls: ['./bar-chart.component.scss'],
        standalone: true
    })
], BarChartComponent);
export { BarChartComponent };
//# sourceMappingURL=bar-chart.component.js.map