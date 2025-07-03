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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.emailError = !this.email;
    this.passwordError = !this.password;
    if (this.emailError || this.passwordError) {
      return;
    }
    if (this.authService.auth(this.email, this.password)) {
      this.router.navigate(["/home"]);
    }
  }
}
