import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonToggle, IonTextarea, IonButton } from '@ionic/angular/standalone';
let HabitLogPage = class HabitLogPage {
    constructor() {
        this.today = '';
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
HabitLogPage = __decorate([
    Component({
        selector: 'app-habit-log',
        templateUrl: './habit-log.page.html',
        styleUrls: ['./habit-log.page.scss'],
        standalone: true,
        imports: [IonContent, CommonModule, FormsModule, IonIcon, IonToggle, IonTextarea, IonButton]
    })
], HabitLogPage);
export { HabitLogPage };
//# sourceMappingURL=habit-log.page.js.map