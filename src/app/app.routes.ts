import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'habit',
    loadComponent: () => import('./pages/habit/habit.page').then( m => m.HabitPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report.page').then( m => m.ReportPage)
  },
  {
    path: 'habit-log',
    loadComponent: () => import('./pages/habit-log/habit-log.page').then( m => m.HabitLogPage)
  },
];
