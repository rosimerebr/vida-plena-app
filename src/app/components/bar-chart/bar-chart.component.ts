import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true
})
export class BarChartComponent {
  @Input() weekData: { label: string, value: number }[] = [];
} 