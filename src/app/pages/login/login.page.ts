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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.emailError = !this.email;
    this.passwordError = !this.password;
    this.loginError = '';
    if (this.emailError || this.passwordError) {
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // Aqui você pode salvar token, usuário, etc.
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        this.loginError = 'Invalid email or password.';
      }
    });
  }
}
