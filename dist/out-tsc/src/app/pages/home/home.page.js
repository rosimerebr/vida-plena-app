import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { BarChartComponent } from "../../components/bar-chart/bar-chart.component";
let HomePage = class HomePage {
    constructor(router) {
        this.router = router;
        this.weekData = [
            { label: 'S', value: 6 },
            { label: 'M', value: 5 },
            { label: 'T', value: 5 },
            { label: 'W', value: 4 },
            { label: 'T', value: 4 },
            { label: 'F', value: 4 },
            { label: 'S', value: 3 }
        ];
    }
    startDailyChallenge() {
        this.router.navigate(['/habit-log']);
    }
    navigateToHabit() {
        this.router.navigate(['/habit']);
    }
};
HomePage = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.page.html',
        styleUrls: ['./home.page.scss'],
        standalone: true,
        imports: [IonButton, IonIcon, BarChartComponent]
    })
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map