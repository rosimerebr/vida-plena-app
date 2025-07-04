import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { BarChartComponent } from "../../components/bar-chart2/bar-chart.component";
let ReportPage = class ReportPage {
    constructor() {
        this.today = '';
        this.weekData = [
            { label: 'S', value: 6 },
            { label: 'M', value: 5 },
            { label: 'T', value: 5 },
            { label: 'W', value: 4 },
            { label: 'T', value: 4 },
            { label: 'F', value: 4 },
            { label: 'S', value: 3 }
        ];
        this.streak = 5;
        this.totalCompleted = 32;
    }
    ngOnInit() {
        const now = new Date();
        // Exemplo de formatação: April 23, 2024
        this.today = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};
ReportPage = __decorate([
    Component({
        selector: 'app-report',
        templateUrl: './report.page.html',
        styleUrls: ['./report.page.scss'],
        standalone: true,
        imports: [IonContent, CommonModule, FormsModule, IonIcon, BarChartComponent]
    })
], ReportPage);
export { ReportPage };
//# sourceMappingURL=report.page.js.map