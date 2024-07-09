import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Formation } from '../models/formation.model';


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8080/api';
  formationsSubject: any;

  constructor(private http: HttpClient) { }

  getFormation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/formations/');
  }
  createFormation(formations: any, formateurId: number, themeId: number) {
    return this.http.post(`${this.apiUrl}/formations/${formateurId}/${themeId}`, formations);
  }
  loadFormations() {
    this.http.get<Formation[]>(this.apiUrl + '/formations/').subscribe(
      data => this.formationsSubject.next(data)
    );
  }
  deleteFormation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/formations/${id}`);
  }
  ModifierFormation(id: number, formation: any, idFormateur: number, idTheme: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/formations/${id}/${idFormateur}/${idTheme}`, formation);
  }


  getFormationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/formations/${id}`);
  }

  getFormationsByParticipant(participantId: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/participant`);
  }
}




