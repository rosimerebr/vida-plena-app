import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

interface UserProfile {
  fullName: string;
  email: string;
  dateOfBirth: string;
  weight: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonIcon]
})
export class ProfilePage implements OnInit {
  user: UserProfile = { fullName: '', email: '', dateOfBirth: '', weight: 0 };
  loading = true;
  saving = false;
  error = '';
  success = '';

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.error = 'User not authenticated. Please log in again.';
      this.loading = false;
      return;
    }
    this.userService.getUserProfile(userId).subscribe({
      next: (data: UserProfile) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching profile data.';
        this.loading = false;
      }
    });
  }

  validateUser(user: UserProfile): string | null {
    if (!user.fullName || !user.email || !user.dateOfBirth) {
      return 'Please fill in all required fields.';
    }
    // Simple email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)) {
      return 'Please enter a valid email address.';
    }
    // Date format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(user.dateOfBirth)) {
      return 'Date of birth must be in YYYY-MM-DD format.';
    }
    if (user.weight !== null && (isNaN(user.weight) || user.weight < 0)) {
      return 'Weight must be a positive number.';
    }
    return null;
  }

  onSave() {
    this.success = '';
    this.error = '';
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.error = 'User not authenticated. Please log in again.';
      return;
    }
    const validationError = this.validateUser(this.user);
    if (validationError) {
      this.error = validationError;
      return;
    }
    this.saving = true;
    this.userService.updateUserProfile(userId, this.user).subscribe({
      next: () => {
        this.success = 'Data updated successfully!';
        this.saving = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error updating profile data.';
        this.saving = false;
      }
    });
  }
} 