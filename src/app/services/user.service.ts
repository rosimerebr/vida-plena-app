import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${userId}`);
  }

  updateUserProfile(userId: string, userData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/${userId}`, userData);
  }
} 