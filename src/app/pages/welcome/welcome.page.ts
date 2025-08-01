import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { sunny, water, leaf, restaurant, walk, scale, moon, heartCircle } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) {
    addIcons({ sunny, water, leaf, restaurant, walk, scale, moon, heartCircle });
  }

  ngOnInit() {
  }
  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onSingUp() {
    this.router.navigateByUrl('/register');
  }

}
