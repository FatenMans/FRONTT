import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/demande';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  getMyRequests() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api/demandes'

  constructor(private http: HttpClient) { }

  createDemande(demande: any, themeId: number): Observable<any> {
    // Récupérer l'email de l'utilisateur connecté depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user')!);
    const nom = user?.userName;  // Ajouter une vérification pour éviter les erreurs si 'user' est null



    // Préparer les paramètres de la requête
    const params = new HttpParams().set('nom', nom);

    // Envoyer la demande avec l'email en tant que paramètre
    return this.http.post<any>(`${this.apiUrl}/create/${themeId}`, demande, { params });
  }

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/all`);
  }

  acceptDemande(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accept/${id}`, {});
  }
  refuserDemande(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/refuser/${id}`, {});
  }
}

