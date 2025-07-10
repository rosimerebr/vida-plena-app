import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonToggle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-habit-log',
  templateUrl: './habit-log.page.html',
  styleUrls: ['./habit-log.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, IonToggle, IonButton]
})
export class HabitLogPage implements OnInit {
  today: string = '';

  constructor() { }

  ngOnInit() {
    const now = new Date();
    // Exemplo de formatação: April 23, 2024
    this.today = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
