import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  addParticipantToFormation(formationId: number, participantnom: String): Observable<void> {

    const user = JSON.parse(localStorage.getItem('user')!);
    const nom = user?.userName;  // Ajouter une vérification pour éviter les erreurs si 'user' est null



    // Préparer les paramètres de la requête
    const params = new HttpParams().set('nom', nom);

    return this.http.post<void>(`${this.apiUrl}/formations/${formationId}/participants/${participantnom}`, {params});
  }

  getFormationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/formations/${id}`);
  }

  getFormationsByParticipant(participantId: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/participant`);
  }
}



