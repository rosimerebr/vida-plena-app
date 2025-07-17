import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BibleService, BibleVerse } from 'src/app/services/bible.service';

@Component({
  selector: 'app-habit',
  templateUrl: './habit.page.html',
  styleUrls: ['./habit.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonIcon, IonButton, CommonModule, FormsModule]
})
export class HabitPage implements OnInit {
  spiritualVerse: BibleVerse | null = null;

  constructor(private router: Router, private bibleService: BibleService) { }

  ngOnInit() {
    this.bibleService.getRandomVerse().subscribe(verse => {
      this.spiritualVerse = verse;
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
