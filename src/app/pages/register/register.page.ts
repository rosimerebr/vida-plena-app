import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonImg, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonInputPasswordToggle, IonButton, IonIcon]
})
export class RegisterPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';
  weight: string = '';

  constructor() { }

  ngOnInit() {
  }

  onRegister() {
    // Lógica de registro aqui
    console.log('Register:', this.fullName, this.email, this.password, this.dob, this.weight);
  }

  onGoogleRegister() {
    // Lógica de registro com Google aqui
    console.log('Register with Google');
  }
}
