import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {IonContent, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonRippleEffect, IonImg, ModalController} from "@ionic/angular/standalone";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { RecoverPasswordModalComponent } from '../../components/recover-password-modal/recover-password-modal.component';

@Component({
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
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  emailError: boolean = false;
  passwordError: boolean = false;
  loginError: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.emailError = !this.email;
    this.passwordError = !this.password;
    this.loginError = '';
    
    if (this.emailError || this.passwordError) {
      return;
    }

    console.log('Trying to login with:', { email: this.email, password: this.password });

    this.authService.login(this.email, this.password).subscribe({
      next: async (res) => {
        console.log('Successful login:', res);
        
        // Save token and user data 
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
          console.log('Token saved to localStorage');
        }
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          console.log('User data saved to localStorage');
        }

        // Show success toast
        const toast = await this.toastController.create({
          message: 'Login successfully!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        console.log('Success toast shown');

        // Navigate to home
        console.log('Navigating to /home...');
        this.router.navigate(["/home"]).then(() => {
          console.log('Navigation completed');
        }).catch(err => {
          console.error('Navigation error:', err);
        });
      },
      error: async (err) => {
        console.error('Login error:', err);
        
        let errorMessage = 'Invalid email or password.';
        
        if (err.status === 0) {
          errorMessage = 'Connection error. Check if the backend is running..';
        } else if (err.error?.message) {
          errorMessage = err.error.message;
        } else if (err.status === 401) {
          errorMessage = 'Incorrect email or password.';
        }

        this.loginError = errorMessage;

        // Show error toast
        const toast = await this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }

  async openRecoverPasswordModal() {
    const modal = await this.modalController.create({
      component: RecoverPasswordModalComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      backdropDismiss: true
    });
    await modal.present();
  }
}
