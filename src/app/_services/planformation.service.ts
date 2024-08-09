import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanFormation } from '../models/planformation.model';

@Injectable({
  providedIn: 'root'
})
export class PlanFormationService {
  private apiUrl = 'http://localhost:8080/api/planformations';

  constructor(private http: HttpClient) { }

  getAllPlanFormations(): Observable<PlanFormation[]> {
    return this.http.get<PlanFormation[]>(this.apiUrl);
  }

  getPlanFormationById(id: number): Observable<PlanFormation> {
    return this.http.get<PlanFormation>(`${this.apiUrl}/${id}`);
  }

  createPlanFormation(planFormation: PlanFormation, themeId: number, lieuId: number): Observable<PlanFormation> {
    return this.http.post<PlanFormation>(`${this.apiUrl}/create?themeId=${themeId}&lieuId=${lieuId}`, planFormation);
  }
  
  updatePlanFormation(id: number, planFormation: PlanFormation): Observable<PlanFormation> {
    return this.http.put<PlanFormation>(`${this.apiUrl}/${id}`, planFormation);
  }

  deletePlanFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addParticipantToFormation(formationId: number, participantId: number): Observable<PlanFormation> {
    return this.http.post<PlanFormation>(`${this.apiUrl}/${formationId}/participants/${participantId}`, {});
  }
  searchByTheme(theme: string): Observable<PlanFormation[]> {
    return this.http.get<PlanFormation[]>(`${this.apiUrl}/search/${theme}`);
  }
}
