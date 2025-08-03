import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BibleVerse {
  reference: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class BibleService {
  private verse$: Observable<BibleVerse> | null = null;

  constructor(private http: HttpClient) {}

  getRandomVerse(): Observable<BibleVerse> {
    if (!this.verse$) {
      this.verse$ = this.http.get<{verse: BibleVerse}>(`${environment.apiUrl}/bible/random`).pipe(
        map(response => response.verse),
        shareReplay(1)
      );
    }
    return this.verse$;
  }
}