import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonLabel, IonText, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, refresh } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recover-password-modal',
  templateUrl: './recover-password-modal.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonLabel, IonText, IonIcon],
  providers: [ModalController],
})
export class RecoverPasswordModalComponent {
  email: string = '';
  secretAnswer: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'error';
  loading = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {
    addIcons({ close, refresh });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (!this.email || !this.secretAnswer || !this.newPassword || !this.confirmPassword) {
      this.message = 'Please fill in all fields.';
      this.messageType = 'error';
      return;
    }

    if (this.newPassword.length < 6) {
      this.message = 'Password must be at least 6 characters.';
      this.messageType = 'error';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    this.message = '';

    const request = {
      email: this.email,
      secretAnswer: this.secretAnswer,
      newPassword: this.newPassword
    };

    this.authService.recoverPassword(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = 'Password recovered successfully!';
        this.messageType = 'success';
        setTimeout(() => {
          this.dismiss();
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.message = error.error?.message || 'Error recovering password.';
        this.messageType = 'error';
      }
    });
  }
} 