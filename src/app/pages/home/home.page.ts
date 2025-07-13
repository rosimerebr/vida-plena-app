import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BarChartComponent, HabitData } from 'src/app/components/bar-chart/bar-chart.component';
import { BibleService, BibleVerse } from 'src/app/services/bible.service';
import { ReportService } from 'src/app/services/report.service';
import { Observable, shareReplay, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, BarChartComponent]
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
    private reportService: ReportService
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

  loadWeeklyReport() {
    this.reportService.getWeeklyReport().subscribe({
      next: (data) => {
        console.log('Weekly report received:', data);
        this.reportData = data;
        this.processHabitsData(data);
        this.calculateStats(data);
      },
      error: (error) => {
        console.error('Error fetching weekly report:', error);
      }
    });
  }

  processHabitsData(data: any) {
    if (!data) return;

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
      
      return {
        name: habit.name,
        icon: habit.icon,
        weeklyTotal: weeklyTotal
      };
    });
  }

  calculateStats(data: any) {
    if (!data) return;

    // Calculate total completed habits
    this.totalCompleted = Object.values(data).reduce((total: number, habitData: any) => {
      if (Array.isArray(habitData)) {
        return total + habitData.reduce((sum: number, value: number) => sum + value, 0);
      }
      return total;
    }, 0);

    // Calculate streak (simplified - can be enhanced)
    this.streak = Math.max(...this.weekData.map(day => day.value));
  }

  startDailyChallenge() {
    this.router.navigate(['/habit-log']);
  }

  navigateToHabit() {
    this.router.navigate(['/habit']);
  }
}

