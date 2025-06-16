import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  auth(email: string, password: string) {
    if (email === 'rosimereinfo@gmail.com' && password === '123456') {
      return true;
    }
    return false;

  }
}
