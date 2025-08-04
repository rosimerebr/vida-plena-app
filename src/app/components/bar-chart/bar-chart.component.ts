import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto';

export interface HabitData {
  name: string;
  icon: string;
  weeklyTotal: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BarChartComponent implements OnChanges, AfterViewInit {
  @Input() weekData: { label: string, value: number }[] = [];
  @Input() habitsData: HabitData[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | null = null;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['habitsData'] && this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Use weekData if provided, otherwise habitsData
    const useWeekData = this.weekData && this.weekData.length > 0;
    const labels = useWeekData ? this.weekData.map(d => d.label) : this.habitsData.map(h => h.name);
    const data = useWeekData ? this.weekData.map(d => d.value) : this.habitsData.map(h => h.weeklyTotal);
    const backgroundColor = data.map(v => v === 0 ? '#cccccc' : '#4CAF50');
    const borderColor = data.map(v => v === 0 ? '#999999' : '#2E7D32');

    const chartData: ChartData<'bar'> = {
      labels: labels,
      datasets: [{
        label: 'Weekly Progress',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} times this week`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...data, 7),
            ticks: {
              stepSize: 1
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  updateChart() {
    if (!this.chart) return;
    const useWeekData = this.weekData && this.weekData.length > 0;
    const labels = useWeekData ? this.weekData.map(d => d.label) : this.habitsData.map(h => h.name);
    const data = useWeekData ? this.weekData.map(d => d.value) : this.habitsData.map(h => h.weeklyTotal);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.data.datasets[0].backgroundColor = data.map(v => v === 0 ? '#cccccc' : '#4CAF50');
    this.chart.data.datasets[0].borderColor = data.map(v => v === 0 ? '#999999' : '#2E7D32');
    this.chart.update();
  }

  // Legacy methods for compatibility
  getMaxValue(): number {
    if (this.habitsData.length === 0) return 7;
    const maxValue = Math.max(...this.habitsData.map(h => h.weeklyTotal));
    console.log('Max value:', maxValue);
    return maxValue;
  }

  getBarHeight(habitName: string): number {
    const habit = this.habitsData.find(h => h.name === habitName);
    if (!habit) return 0;
    
    console.log(`Calculating height for ${habitName}: value=${habit.weeklyTotal}`);
    
    // If habit has 0 records, fixed height of 20%
    if (habit.weeklyTotal === 0) {
      return 20;
    }
    
    // If has records, calculate proportional height
    const maxValue = this.getMaxValue();
    const height = (habit.weeklyTotal / maxValue) * 100;
    
    // Return real proportional height without forcing minimum height
    const finalHeight = Math.max(height, 5); // Only 5% minimum height for visibility
    
    console.log(`Bar height for ${habitName}: ${finalHeight}% (${habit.weeklyTotal}/${maxValue})`);
    return finalHeight;
  }

  getBarColor(habitName: string): string {
    const habit = this.habitsData.find(h => h.name === habitName);
    if (!habit) return '#ccc';
    
    // If habit has 0 records, gray color
    if (habit.weeklyTotal === 0) {
      return '#cccccc';
    }
    
    // If has records, green color
    return '#4CAF50';
  }
} 