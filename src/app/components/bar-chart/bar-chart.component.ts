import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export interface HabitData {
  name: string;
  icon: string;
  weeklyTotal: number; // Total de vezes que o hábito foi realizado na semana
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon]
})
export class BarChartComponent {
  @Input() weekData: { label: string, value: number }[] = [];
  @Input() habitsData: HabitData[] = [];
  
  readonly habits = [
    { name: 'Sunlight', icon: 'sunny' },
    { name: 'Water', icon: 'water' },
    { name: 'Air', icon: 'leaf' },
    { name: 'Healthy Food', icon: 'restaurant' },
    { name: 'Exercise', icon: 'walk' },
    { name: 'Temperance', icon: 'scale' },
    { name: 'Rest', icon: 'moon' },
    { name: 'Trust in God', icon: 'heart-circle-outline' }
  ];

  getHabitData(habitName: string): HabitData | undefined {
    return this.habitsData.find(h => h.name === habitName);
  }

  getMaxValue(): number {
    if (this.habitsData.length === 0) return 7; // Máximo possível por semana
    return Math.max(...this.habitsData.map(h => h.weeklyTotal));
  }

  getBarHeight(habitName: string): number {
    const habit = this.getHabitData(habitName);
    if (!habit) return 0;
    const maxValue = this.getMaxValue();
    return maxValue > 0 ? (habit.weeklyTotal / maxValue) * 100 : 0;
  }

  getTotalCompleted(): number {
    return this.habitsData.reduce((sum, h) => sum + h.weeklyTotal, 0);
  }

  getBestHabit(): string {
    if (this.habitsData.length === 0) return 'None';
    const bestHabit = this.habitsData.reduce((max, h) => 
      h.weeklyTotal > max.weeklyTotal ? h : max);
    return bestHabit.weeklyTotal > 0 ? bestHabit.name : 'None';
  }
} 