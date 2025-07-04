import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
let Tab1Page = class Tab1Page {
    constructor() { }
};
Tab1Page = __decorate([
    Component({
        selector: 'app-tab1',
        templateUrl: 'tab1.page.html',
        styleUrls: ['tab1.page.scss'],
        imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, MainMenuComponent],
    })
], Tab1Page);
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map