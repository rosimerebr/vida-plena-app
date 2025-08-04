import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface HabitLog {
  date: string; 
  habits: { [habit: string]: boolean };
}

export interface HabitReport {
  habit: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Save habit log locally
  saveHabitLog(log: HabitLog): void {
    localStorage.setItem('habit-log-' + log.date, JSON.stringify(log.habits));
  }

  // Get habit log from local storage
  getHabitLog(date: string): { [habit: string]: boolean } | null {
    const data = localStorage.getItem('habit-log-' + date);
    return data ? JSON.parse(data) : null;
  }

  // Clear all habit logs from local storage (useful when user logs out or changes)
  clearAllHabitLogs(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('habit-log-')) {
        localStorage.removeItem(key);
      }
    });
  }

  // Get habits from backend for a specific date
  getHabitsFromBackend(date: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/report/habits/${date}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Send habit to backend
  sendHabitToBackend(habitReport: HabitReport): Observable<any> {
    return this.http.post(`${environment.apiUrl}/report`, [habitReport], {
      headers: this.getAuthHeaders()
    });
  }

  // Save habit and send to backend
  saveHabitWithBackendSync(log: HabitLog, userId: string): Observable<any> {
    // Save locally first
    this.saveHabitLog(log);
    
    // Prepare habits to send to backend
    const habitsToSend: HabitReport[] = [];
    
    Object.entries(log.habits).forEach(([habit, completed]) => {
      if (completed) {
        habitsToSend.push({
          habit: habit,
          date: log.date
        });
      }
    });

    // Send all completed habits to backend
    if (habitsToSend.length > 0) {
      return this.http.post(`${environment.apiUrl}/report`, habitsToSend, {
        headers: this.getAuthHeaders()
      });
    } else {
      // Return empty observable if no habits to send
      return new Observable(subscriber => {
        subscriber.next({ message: 'No habits to send' });
        subscriber.complete();
      });
    }
  }
}
