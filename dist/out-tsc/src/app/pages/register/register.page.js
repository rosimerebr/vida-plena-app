import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
let RegisterPage = class RegisterPage {
    constructor(router, toastController) {
        this.router = router;
        this.toastController = toastController;
        this.fullName = '';
        this.email = '';
        this.password = '';
        this.dob = '';
        this.weight = '';
    }
    ngOnInit() {
    }
    async onRegister() {
        // Lógica de registro aqui
        if (!this.fullName || !this.email || !this.password || !this.dob || !this.weight) {
            const errorToast = await this.toastController.create({
                message: 'Please fill in all fields.',
                duration: 2000,
                color: 'danger',
                position: 'top'
            });
            await errorToast.present();
            return;
        }
        console.log('Register:', this.fullName, this.email, this.password, this.dob, this.weight);
        const toast = await this.toastController.create({
            message: 'Registration successful!',
            duration: 2000,
            color: 'success',
            position: 'top'
        });
        await toast.present();
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 2000);
    }
    onGoogleRegister() {
        // Registration logic with Google here
        console.log('Register with Google');
    }
    goToLogin() {
        this.router.navigate(['/login']);
    }
};
RegisterPage = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.page.html',
        styleUrls: ['./register.page.scss'],
        standalone: true,
        imports: [IonImg, IonItem, IonContent, CommonModule, FormsModule, IonInput, IonInputPasswordToggle, IonButton, IonIcon]
    })
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register.page.js.map