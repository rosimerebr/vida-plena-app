import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { addIcons } from 'ionicons';
import { home, personCircle, leaf, walk, barChart, informationCircle, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet,
    RouterModule
  ]
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ home, personCircle, leaf, walk, barChart, informationCircle, logOut });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
