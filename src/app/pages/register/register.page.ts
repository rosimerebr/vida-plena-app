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

    // Validar formato da data
    if (this.dob.length !== 8) { // DD/MM/YY = 8 caracteres
      const errorToast = await this.toastController.create({
        message: 'Por favor, insira uma data válida no formato DD/MM/YY.',
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
