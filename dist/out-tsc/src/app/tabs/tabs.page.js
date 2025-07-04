import { __decorate } from "tslib";
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
let TabsPage = class TabsPage {
    constructor() {
        this.environmentInjector = inject(EnvironmentInjector);
        addIcons({ triangle, ellipse, square });
    }
};
TabsPage = __decorate([
    Component({
        selector: 'app-tabs',
        templateUrl: 'tabs.page.html',
        styleUrls: ['tabs.page.scss'],
        imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
    })
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map