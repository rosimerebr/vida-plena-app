import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonContent, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonRippleEffect, IonImg, } from "@ionic/angular/standalone";
let LoginPage = class LoginPage {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.email = "";
        this.password = "";
        this.emailError = false;
        this.passwordError = false;
    }
    ngOnInit() { }
    onLogin() {
        this.emailError = !this.email;
        this.passwordError = !this.password;
        if (this.emailError || this.passwordError) {
            return;
        }
        if (this.authService.auth(this.email, this.password)) {
            this.router.navigate(["/home"]);
        }
    }
};
LoginPage = __decorate([
    Component({
        selector: "app-login",
        templateUrl: "./login.page.html",
        styleUrls: ["./login.page.scss"],
        standalone: true,
        imports: [
            IonImg,
            IonItem,
            IonContent,
            CommonModule,
            FormsModule,
            IonInput,
            IonInputPasswordToggle,
            IonButton,
            IonRippleEffect,
        ],
    })
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map