import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule} from '@ionic/angular';
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
