import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(userData: {
    fullName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    weight: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, userData);
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: any = (window as any).jwt_decode ? (window as any).jwt_decode(token) : JSON.parse(atob(token.split('.')[1]));
      return decoded.userId || decoded.sub || null;
    } catch (e) {
      return null;
    }
  }
}
