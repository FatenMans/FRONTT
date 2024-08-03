import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formateur } from '../models/formateur.model';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getFormateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/formateurs/all');
  }
  createFormateur(formateur: any) {
    return this.http.post<any>(this.apiUrl + '/formateurs/create', formateur);
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
}


