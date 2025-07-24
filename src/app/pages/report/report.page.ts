import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar, IonChip } from '@ionic/angular/standalone';
import { BarChartComponent, HabitData } from 'src/app/components/bar-chart/bar-chart.component';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar, IonChip,
    BarChartComponent, CommonModule, FormsModule
  ]
})
export class ReportPage implements OnInit {
  loading = true;
  error = '';
  period = '';
  habitsData: HabitData[] = [];
  weekData: { label: string, value: number }[] = [];
  streak = 0;
  totalCompleted = 0;
  motivationalMessage = '';
  allCompletedDaysCount = 0;
  habitNames = [
    'Sunlight', 'Water', 'Air', 'Healthy Food',
    'Exercise', 'Temperance', 'Rest', 'Trust in God'
  ];

  constructor(private reportService: ReportService, private authService: AuthService) { }

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.error = 'User not authenticated. Please log in again.';
      this.loading = false;
      return;
    }
    this.loading = true;

    // 1. Relatório semanal para o gráfico
    this.reportService.getWeeklyReport(userId).subscribe({
      next: (data) => {
        this.processHabitsData(data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error fetching weekly report data.';
        this.loading = false;
      }
    });

    // 2. Relatório mensal para o campo Complete
    const now = new Date();
    const month = now.toISOString().slice(0, 7); // 'YYYY-MM'
    this.reportService.getMonthlyReport(userId, month).subscribe({
      next: (monthLogs: any[]) => {
        this.allCompletedDaysCount = monthLogs.filter((log: any) =>
          this.habitNames.every(habit => log.habits[habit])
        ).length;
      },
      error: () => {
        this.error = 'Error fetching monthly report data.';
      }
    });
  }

  processHabitsData(data: any) {
    if (!data) {
      this.habitsData = [];
      this.weekData = [];
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
    // Soma por dia da semana
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekTotals = [0, 0, 0, 0, 0, 0, 0];
    for (const habit of habits) {
      const weeklyData = data[habit.name] || [0, 0, 0, 0, 0, 0, 0];
      weeklyData.forEach((val: number, idx: number) => {
        weekTotals[idx] += val;
      });
    }
    this.weekData = daysOfWeek.map((label, idx) => ({
      label,
      value: weekTotals[idx]
    }));
    // Mantém habitsData para outros usos, se necessário
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