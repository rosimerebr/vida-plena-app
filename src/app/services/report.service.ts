import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getWeeklyReport(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/report`, {
      headers: this.getAuthHeaders()
    });
  }

  getMonthlyReport(month: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/report/monthly?month=${month}`, {
      headers: this.getAuthHeaders()
    });
  }
}
