import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}


