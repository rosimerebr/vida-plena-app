import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BarChartComponent } from 'src/app/components/bar-chart/bar-chart.component';
import { BibleService, BibleVerse } from 'src/app/services/bible.service';
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
    { label: 'S', value: 6 },
    { label: 'M', value: 5 },
    { label: 'T', value: 5 },
    { label: 'W', value: 4 },
    { label: 'T', value: 4 },
    { label: 'F', value: 4 },
    { label: 'S', value: 3 }
  ];

  spiritualVerse: BibleVerse | null = null;

  constructor(private router: Router, private bibleService: BibleService) {}

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
  }

  startDailyChallenge() {
    this.router.navigate(['/habit-log']);
  }

  navigateToHabit() {
    this.router.navigate(['/habit']);
  }
}

