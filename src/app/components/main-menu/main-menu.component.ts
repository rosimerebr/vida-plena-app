import { Component } from '@angular/core';
import { IonToolbar, IonTitle, IonButtons, IonButton, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [IonToolbar, IonTitle, IonButtons, IonButton, IonImg],
})
export class MainMenuComponent {}
