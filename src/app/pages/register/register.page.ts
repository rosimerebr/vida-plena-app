import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonImg, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonImg, IonItem, IonContent, CommonModule, FormsModule, IonInput, IonInputPasswordToggle, IonButton, IonLabel]
})
export class RegisterPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';
  weight: string = '';
  secretAnswer: string = '';

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // Método para formatar a data automaticamente
  formatDateOfBirth(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    
    // Adiciona as barras automaticamente
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5);
    }
    
    this.dob = value;
  }

  // Método para converter DD/MM/YY para YYYY-MM-DD
  convertDateForBackend(dateString: string): string {
    if (!dateString || dateString.length !== 8) return '';
    
    const parts = dateString.split('/');
    if (parts.length !== 3) return '';
    
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    
    // Adiciona 20 ao ano se for menor que 50, senão adiciona 19
    const fullYear = parseInt(year) < 50 ? '20' + year : '19' + year;
    
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  async onRegister() {
    // Validação dos campos obrigatórios
    if (!this.fullName || !this.email || !this.password || !this.dob || !this.secretAnswer) {
      const errorToast = await this.toastController.create({
        message: 'PPlease fill in all required fields.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await errorToast.present();
      return;
    }

    // Validar formato da data
    if (this.dob.length !== 8) { // DD/MM/YY = 8 caracteres
      const errorToast = await this.toastController.create({
        message: 'Please enter a valid date in DD/MM/YY format.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await errorToast.present();
      return;
    }

    // Preparar dados para envio
    const userData = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      dateOfBirth: this.convertDateForBackend(this.dob),
      weight: parseFloat(this.weight) || 0,
      secretQuestion: "What is your mother's name?",
      secretAnswer: this.secretAnswer
    };

    // Chamar o serviço de registro
    this.authService.register(userData).subscribe({
      next: async (response) => {
        console.log('User registered successfully:', response);
        const toast = await this.toastController.create({
          message: 'Registration completed successfully!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: async (error) => {
        console.error('Error in registration:', error);
        let errorMessage = 'Error when registering.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 409) {
          errorMessage = 'This email is already registered.';
        } else if (error.status === 0) {
          errorMessage = 'Connection error. Check if the backend is running.';
        }

        const errorToast = await this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await errorToast.present();
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
