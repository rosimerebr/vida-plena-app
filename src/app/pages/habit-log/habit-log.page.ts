import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonToggle, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { HabitService, HabitLog } from 'src/app/services/habit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habit-log',
  templateUrl: './habit-log.page.html',
  styleUrls: ['./habit-log.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, CommonModule, FormsModule, IonIcon, IonToggle, IonButton]
})
export class HabitLogPage implements OnInit {
  today: string = '';
  displayDate: string = '';
  habits: { name: string; icon: string }[] = [
    { name: 'Sunlight', icon: 'sunny' },
    { name: 'Water', icon: 'water' },
    { name: 'Air', icon: 'leaf' },
    { name: 'Healthy Food', icon: 'restaurant' },
    { name: 'Physical Exercise', icon: 'walk' },
    { name: 'Temperance', icon: 'scale' },
    { name: 'Rest', icon: 'moon' },
    { name: 'Trust in God', icon: 'heart-circle-outline' }
  ];
  habitStatus: { [habit: string]: boolean } = {};

  constructor(private habitService: HabitService, private router: Router) { }

  ngOnInit() {
    const now = new Date();
    this.today = now.toISOString().slice(0, 10); // format: YYYY-MM-DD
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const day = now.getDate();
    this.displayDate = `${month} ${day}`;
    // Initialize habit status
    const saved = this.habitService.getHabitLog(this.today);
    this.habits.forEach(h => {
      this.habitStatus[h.name] = saved ? !!saved[h.name] : false;
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
    
    // Use the new method that saves locally and sends to backend
    // For now, using a default userId - in a real app, this would come from auth service
    const userId = 'default-user'; // TODO: Get from auth service
    
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
