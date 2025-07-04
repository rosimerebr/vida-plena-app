import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
let HabitPage = class HabitPage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    goBack() {
        this.router.navigate(['/home']);
    }
};
HabitPage = __decorate([
    Component({
        selector: 'app-habit',
        templateUrl: './habit.page.html',
        styleUrls: ['./habit.page.scss'],
        standalone: true,
        imports: [IonContent, CommonModule, FormsModule, IonIcon, IonButton]
    })
], HabitPage);
export { HabitPage };
//# sourceMappingURL=habit.page.js.map