import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lieuheb } from '../models/lieuheb.model';

@Injectable({
  providedIn: 'root'
})
export class LieuhebService {
  private apiUrl = 'http://localhost:8080/api'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  getLieu(): Observable<Lieuheb[]> {
    return this.http.get<Lieuheb[]>(this.apiUrl);
  }

  createLieuHeb(lieuheb: any){
    return this.http.post<Lieuheb>(`${this.apiUrl}/create`, lieuheb);
  }
  deleteLieuheb(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
