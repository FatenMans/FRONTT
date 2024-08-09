import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes`);
  }
  getThemeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/themes/${id}`);
  }

  createTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}/themes/create`, theme);
  }
  deleteTheme(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/themes/${id}`);
  }

  ModifierTheme(id: number, theme: Theme): Observable<any> {
    return this.http.put(`${this.apiUrl}/themes/${id}`, theme);
  }
}
