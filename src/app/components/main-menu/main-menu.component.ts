import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [IonButton, IonIcon],
})
export class MainMenuComponent  implements OnInit {

  constructor() { 
    addIcons({ heart });
  }

  ngOnInit() {}

}
