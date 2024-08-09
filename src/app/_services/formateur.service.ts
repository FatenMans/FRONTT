import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formateur } from '../models/formateur.model';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }


  createFormateur(formateur: any, themeId: number): Observable<any> {
    // Créer un objet contenant les données à envoyer
 
    
    // Envoyer la requête POST avec les données au format JSON et le thèmeId en tant que paramètre de requête
    return this.http.post<any>(`${this.apiUrl}/formateurs/create/${themeId}`, formateur);
  }



  deleteFormateur(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/formateurs/${id}`);
  }

  ModifierFormateur(id: number, foramteur: any): Observable<any> {

    return this.http.put(`${this.apiUrl}/formateurs/update/${id}`, foramteur);
  }

  getFormateurById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/formateurs/${id}`);
  }

  searchFormateur(nom:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/formateurs/search/${nom}`);
  }
  getFormateurs(theme?: string): Observable<any[]> {
    let params = new HttpParams();
    if (theme) {
      params = params.set('theme', theme);
    }
    return this.http.get<any[]>(`${this.apiUrl}/formateurs/all/${theme}`, { params });
  }
}



