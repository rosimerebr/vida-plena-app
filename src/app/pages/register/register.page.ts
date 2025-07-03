import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonImg, IonItem, IonContent, CommonModule, FormsModule, IonInput, IonInputPasswordToggle, IonButton, IonIcon]
})
export class RegisterPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';
  weight: string = '';

  constructor(private router: Router, private toastController: ToastController) { }

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
}
