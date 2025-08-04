import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonToggle, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, sunny, water, leaf, restaurant, walk, scale, moon, heartCircle } from 'ionicons/icons';
import { HabitService, HabitLog } from 'src/app/services/habit.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-habit-log',
  templateUrl: './habit-log.page.html',
  styleUrls: ['./habit-log.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonToggle, IonButton, CommonModule, FormsModule]
})
export class HabitLogPage implements OnInit {
  today: string = '';
  displayDate: string = '';
  habits: { name: string; icon: string }[] = [
    { name: 'Sunlight', icon: 'sunny' },
    { name: 'Water', icon: 'water' },
    { name: 'Air', icon: 'leaf' },
    { name: 'Healthy Food', icon: 'restaurant' },
    { name: 'Exercise', icon: 'walk' },
    { name: 'Temperance', icon: 'scale' },
    { name: 'Rest', icon: 'moon' },
    { name: 'Trust in God', icon: 'heart-circle' }
  ];
  habitStatus: { [habit: string]: boolean } = {};

  constructor(private habitService: HabitService, private router: Router, private authService: AuthService) {
    addIcons({ arrowBackCircle, sunny, water, leaf, restaurant, walk, scale, moon, heartCircle });
  }

  ngOnInit() {
    const now = new Date();
    this.today = now.toISOString().slice(0, 10); // format: YYYY-MM-DD
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const day = now.getDate();
    this.displayDate = `${month} ${day}`;
    
    // Initialize habit status - start with all habits unchecked
    this.habits.forEach(h => {
      this.habitStatus[h.name] = false;
    });

    // Load saved habits from backend for today
    this.loadSavedHabits();
  }

  loadSavedHabits() {
    this.habitService.getHabitsFromBackend(this.today).subscribe({
      next: (savedHabits) => {
        console.log('Loaded saved habits:', savedHabits);
        // Update habit status with saved data
        this.habits.forEach(h => {
          this.habitStatus[h.name] = savedHabits[h.name] || false;
        });
      },
      error: (error) => {
        console.error('Error loading saved habits:', error);
        // If error, keep all habits unchecked
      }
    });
  }

  onToggle(habit: string, checked: boolean) {
    this.habitStatus[habit] = checked;
  }

  save() {
    const log: HabitLog = {
      date: this.today,
      habits: { ...this.habitStatus }
    };
    
    // Get userId from AuthService
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User not authenticated. Could not get userId.');
      // Here you can redirect to login or show an error message
      this.router.navigate(['/login']);
      return;
    }
    
    this.habitService.saveHabitWithBackendSync(log, userId).subscribe({
      next: (response) => {
        console.log('Habits saved successfully:', response);
        // Navigate to home after saving
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error saving habits to backend:', error);
        // Even if backend fails, we still save locally
        this.habitService.saveHabitLog(log);
        // Navigate to home after saving locally
        this.router.navigate(['/home']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
