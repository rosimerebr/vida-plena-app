import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menu.component';
import { Router } from '@angular/router';
import { BarChartComponent, HabitData } from 'src/app/components/bar-chart/bar-chart.component';
import { BibleService, BibleVerse } from 'src/app/services/bible.service';
import { ReportService } from 'src/app/services/report.service';
import { Observable, shareReplay, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonButton, BarChartComponent]
})
export class HomePage implements OnInit {
  weekData = [
    { label: 'S', value: 0 },
    { label: 'M', value: 0 },
    { label: 'T', value: 0 },
    { label: 'W', value: 0 },
    { label: 'T', value: 0 },
    { label: 'F', value: 0 },
    { label: 'S', value: 0 }
  ];

  spiritualVerse: BibleVerse | null = null;
  reportData: any = null;
  habitsData: HabitData[] = [];
  totalCompleted = 0;
  streak = 0;

  constructor(
    private router: Router, 
    private bibleService: BibleService,
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('Fetching verse...');
    this.bibleService.getRandomVerse().subscribe({
      next: (verse) => {
        console.log('Verse received:', verse);
        this.spiritualVerse = verse;
      },
      error: (error) => {
        console.error('Error fetching verse:', error);
      }
    });

    // Fetch weekly report data
    this.loadWeeklyReport();
  }

  // Lifecycle do Ionic para atualizar sempre que a página entra em foco
  ionViewWillEnter() {
    this.loadWeeklyReport();
  }

  loadWeeklyReport() {
    console.log('Loading weekly report...');
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('Unauthenticated user.');
      this.useTestData();
      return;
    }
    this.reportService.getWeeklyReport().subscribe({
      next: (data) => {
        console.log('Weekly report received:', data);
        this.reportData = data;
        setTimeout(() => {
          this.processHabitsData(data);
          // Use the totalCompleted from backend instead of recalculating
          this.totalCompleted = data?.totalCompleted || 0;
          this.streak = data?.streak || 0;
          console.log('Final habits data after processing:', this.habitsData);
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching weekly report:', error);
        this.useTestData();
      }
    });
  }

  useTestData() {
    console.log('Using test data due to error');
    this.habitsData = [
      { name: 'Sunlight', icon: 'sunny', weeklyTotal: 3 },
      { name: 'Water', icon: 'water', weeklyTotal: 5 },
      { name: 'Air', icon: 'leaf', weeklyTotal: 2 },
      { name: 'Healthy Food', icon: 'restaurant', weeklyTotal: 4 },
      { name: 'Exercise', icon: 'walk', weeklyTotal: 6 },
      { name: 'Temperance', icon: 'scale', weeklyTotal: 1 },
      { name: 'Rest', icon: 'moon', weeklyTotal: 7 },
      { name: 'Trust in God', icon: 'heart-circle-outline', weeklyTotal: 3 }
    ];
    this.totalCompleted = this.habitsData.reduce((sum, h) => sum + h.weeklyTotal, 0);
    this.streak = Math.max(...this.habitsData.map(h => h.weeklyTotal));
  }

  processHabitsData(data: any) {
    if (!data) return;

    console.log('Processing habits data:', data);

    const habits = [
      { name: 'Sunlight', icon: 'sunny' },
      { name: 'Water', icon: 'water' },
      { name: 'Air', icon: 'leaf' },
      { name: 'Healthy Food', icon: 'restaurant' },
      { name: 'Exercise', icon: 'walk' },
      { name: 'Temperance', icon: 'scale' },
      { name: 'Rest', icon: 'moon' },
      { name: 'Trust in God', icon: 'heart-circle-outline' }
    ];

    this.habitsData = habits.map(habit => {
      const weeklyData = data[habit.name] || [0, 0, 0, 0, 0, 0, 0];
      const weeklyTotal = weeklyData.reduce((sum: number, val: number) => sum + val, 0);
      
      console.log(`Habit: ${habit.name}, Weekly Data: ${weeklyData}, Total: ${weeklyTotal}`);
      
      return {
        name: habit.name,
        icon: habit.icon,
        weeklyTotal: weeklyTotal
      };
    });

    console.log('Final habits data:', this.habitsData);
    
    // Forçar detecção de mudanças
    this.habitsData = [...this.habitsData];
  }

  startDailyChallenge() {
    this.router.navigate(['/habit-log']);
  }

  navigateToHabit() {
    this.router.navigate(['/habit']);
  }
}

