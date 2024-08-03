import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';

interface Participant {
  id: number;
  nom: string;
  prenom: string;
  // Ajoutez d'autres propriétés selon votre modèle
}

@Injectable({
  providedIn: 'root'
})


  export class ParticipantService {
   

    private apiUrl = 'http://localhost:8080/api';
  
    constructor(private http: HttpClient) { }
  
    getParticipants(): Observable<Participant[]> {
      return this.http.get<Participant[]>(`${this.apiUrl}/participants/`);
    }
  
    createParticipant(participant: any, lieuHebergementId: number): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/participants/${lieuHebergementId}`, participant);
    }
  
    updateParticipant(id: number, participant: Participant, lieuHebergementId: number, userId: string): Observable<Participant> {
      return this.http.put<Participant>(`${this.apiUrl}/participants/${id}?lieuHebergementId=${lieuHebergementId}`, participant, {
        headers: { 'X-User-Id': userId }
      });
    }

     becomeInternalTrainer(participantId: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/${participantId}/participants/internal-trainer`, {});
    }
    deleteParticipant(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/participants/${id}`);
    }
  
    getParticipantById(id: number): Observable<Participant> {
      return this.http.get<Participant>(`${this.apiUrl}/participants/${id}`);
    }
    getParticipantByEmail(email: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/by-email?email=${email}`);
    }
  }