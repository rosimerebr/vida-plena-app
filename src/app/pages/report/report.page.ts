import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon} from '@ionic/angular/standalone';
import { BarChartComponent } from 'src/app/components/bar-chart/bar-chart.component';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, BarChartComponent]
})
export class ReportPage implements OnInit {
  today: string = '';
  weekData = [
    { label: 'S', value: 6 },
    { label: 'M', value: 5 },
    { label: 'T', value: 5 },
    { label: 'W', value: 4 },
    { label: 'T', value: 4 },
    { label: 'F', value: 4 },
    { label: 'S', value: 3 }
  ];
  streak = 5;
  totalCompleted = 32;
  reportData: any = null; // Holds the report data from backend

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    // Get today's date for display
    const now = new Date();
    this.today = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Fetch the weekly report from backend
    this.reportService.getWeeklyReport().subscribe({
      next: (data) => {
        this.reportData = data;
        console.log('Weekly report received:', data);
      },
      error: (err) => {
        console.error('Error fetching weekly report:', err);
      }
    });
  }
}

