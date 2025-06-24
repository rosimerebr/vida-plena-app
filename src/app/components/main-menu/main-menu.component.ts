import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { sunny, water, leaf, restaurant, walk, scale, moon, heartCircleOutline} from 'ionicons/icons';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [IonButton, IonIcon],
})
export class MainMenuComponent  implements OnInit {

  constructor() { 
    addIcons({
      sunny,
      water,
      leaf,
      restaurant,
      walk,
      scale,
      moon,
      heartCircleOutline,
    });
  }

  ngOnInit() {}

}
