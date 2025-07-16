import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { BarChartComponent, HabitData } from 'src/app/components/bar-chart/bar-chart.component';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, IonButton, IonSpinner, BarChartComponent]
})
export class ReportPage implements OnInit {
  loading = true;
  error = '';
  period = '';
  habitsData: HabitData[] = [];
  streak = 0;
  totalCompleted = 0;
  motivationalMessage = '';

  constructor(private reportService: ReportService, private authService: AuthService) { }

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.error = 'User not authenticated. Please log in again.';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.reportService.getWeeklyReport(userId).subscribe({
      next: (data) => {
        this.processHabitsData(data);
        this.streak = data?.streak || 0;
        this.totalCompleted = data?.totalCompleted || 0;
        this.period = this.formatPeriod(data?.periodStart, data?.periodEnd);
        this.motivationalMessage = this.getMotivationalMessage(this.streak, this.totalCompleted);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error fetching report data.';
        this.loading = false;
      }
    });
  }

  processHabitsData(data: any) {
    if (!data) {
      this.habitsData = [];
      return;
    }
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
    // Se vier no formato habitsData, use direto
    if (Array.isArray(data.habitsData)) {
      this.habitsData = data.habitsData;
      return;
    }
    // Se vier como objeto com arrays por hábito, processa igual à home
    this.habitsData = habits.map(habit => {
      const weeklyData = data[habit.name] || [0, 0, 0, 0, 0, 0, 0];
      const weeklyTotal = Array.isArray(weeklyData) ? weeklyData.reduce((sum: number, val: number) => sum + val, 0) : 0;
      return {
        name: habit.name,
        icon: habit.icon,
        weeklyTotal: weeklyTotal
      };
    });
    this.habitsData = [...this.habitsData];
  }

  formatPeriod(start?: string, end?: string): string {
    if (start && end) {
      return `${this.formatDate(start)} - ${this.formatDate(end)}`;
    }
    return '';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getMotivationalMessage(streak: number, total: number): string {
    if (streak >= 7) {
      return 'Amazing! You kept your streak all week!';
    } else if (streak >= 4) {
      return `Great job! You kept your streak for ${streak} days!`;
    } else if (total >= 10) {
      return 'Good effort! Try to keep your streak for more days next week.';
    } else {
      return 'Let’s try to complete more habits next week!';
    }
  }

  goBack() {
    window.history.back();
  }
} 