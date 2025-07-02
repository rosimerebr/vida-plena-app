import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    // Logging logic here
    console.log('Register:', this.fullName, this.email, this.password, this.dob, this.weight);
  }

  onGoogleRegister() {
    // Registration logic with Google here
    console.log('Register with Google');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
