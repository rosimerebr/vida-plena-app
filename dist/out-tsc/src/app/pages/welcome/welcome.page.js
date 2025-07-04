import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
let WelcomePage = class WelcomePage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    onLogin() {
        this.router.navigateByUrl('/login');
    }
    onSingUp() {
        this.router.navigateByUrl('/register');
    }
};
WelcomePage = __decorate([
    Component({
        selector: 'app-welcome',
        templateUrl: './welcome.page.html',
        styleUrls: ['./welcome.page.scss'],
        standalone: true,
        imports: [CommonModule, FormsModule, IonicModule]
    })
], WelcomePage);
export { WelcomePage };
//# sourceMappingURL=welcome.page.js.map