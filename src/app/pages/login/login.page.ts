import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonItem,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonRippleEffect,
  IonImg,
} from "@ionic/angular/standalone";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.emailError = !this.email;
    this.passwordError = !this.password;
    this.loginError = '';
    
    if (this.emailError || this.passwordError) {
      return;
    }

    console.log('Tentando login com:', { email: this.email, password: this.password });

    this.authService.login(this.email, this.password).subscribe({
      next: async (res) => {
        console.log('Login bem-sucedido:', res);
        
        // Salvar token e dados do usuário (opcional)
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }

        // Mostrar toast de sucesso
        const toast = await this.toastController.create({
          message: 'Login realizado com sucesso!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();

        // Navegar para home
        this.router.navigate(["/home"]);
      },
      error: async (err) => {
        console.error('Erro no login:', err);
        
        let errorMessage = 'E-mail ou senha inválidos.';
        
        if (err.status === 0) {
          errorMessage = 'Erro de conexão. Verifique se o backend está rodando.';
        } else if (err.error?.message) {
          errorMessage = err.error.message;
        } else if (err.status === 401) {
          errorMessage = 'E-mail ou senha incorretos.';
        }

        this.loginError = errorMessage;

        // Mostrar toast de erro
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
}
