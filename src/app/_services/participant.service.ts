import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  AddFileToPart(nom: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nom', nom);
    formData.append('file', file);

    return this.http.put<any>(this.apiUrl + "/participants/addFile", formData);
  }

  downloadFile(fileName: string): Observable<Blob> {
    const params = new HttpParams().set('fileName', fileName);
    return this.http.get(this.apiUrl, { responseType: 'blob', params });
  }
  convertParticipant(id: number): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/participants/convert-participant/${id}`, null);
  }
}