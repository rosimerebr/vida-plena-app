import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async onRegister() {
    // Validação dos campos obrigatórios
    if (!this.fullName || !this.email || !this.password || !this.dob) {
      const errorToast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos obrigatórios.',
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
      dateOfBirth: this.dob,
      weight: parseFloat(this.weight) || 0
    };

    // Chamar o serviço de registro
    this.authService.register(userData).subscribe({
      next: async (response) => {
        console.log('Usuário registrado com sucesso:', response);
        const toast = await this.toastController.create({
          message: 'Cadastro realizado com sucesso!',
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
        console.error('Erro no registro:', error);
        let errorMessage = 'Erro ao realizar cadastro.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 409) {
          errorMessage = 'Este e-mail já está cadastrado.';
        } else if (error.status === 0) {
          errorMessage = 'Erro de conexão. Verifique se o backend está rodando.';
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

  onGoogleRegister() {
    // Registration logic with Google here
    console.log('Register with Google');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
