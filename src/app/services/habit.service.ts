import { Injectable } from '@angular/core';

export interface HabitLog {
  date: string; // formato YYYY-MM-DD
  habits: { [habit: string]: boolean };
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor() { }

  saveHabitLog(log: HabitLog): void {
    localStorage.setItem('habit-log-' + log.date, JSON.stringify(log.habits));
  }

  getHabitLog(date: string): { [habit: string]: boolean } | null {
    const data = localStorage.getItem('habit-log-' + date);
    return data ? JSON.parse(data) : null;
  }
}
