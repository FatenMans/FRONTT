import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lieu } from '../models/lieu.model';

@Injectable({
  providedIn: 'root'
})
export class LieuService {
  private apiUrl = 'http://localhost:8080';
  lieuSubject = new BehaviorSubject<Lieu[]>([]);

  constructor(private http: HttpClient) { }

  getLieu(): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(this.apiUrl + '/lieux/all');
  }

  getAllLieux(): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(`${this.apiUrl}/lieux/all`);
  }

  ModifierLieu(id: number, lieu: Lieu): Observable<any> {
    return this.http.put(`${this.apiUrl}/lieux/${id}`, lieu);
  }

  createLieu(lieux: Lieu): Observable<Lieu> {
    return this.http.post<Lieu>(this.apiUrl + '/lieux/create', lieux);
  }

  loadLieux() {
    this.http.get<Lieu[]>(this.apiUrl + '/lieux/all').subscribe(
      data => this.lieuSubject.next(data)
    );
  }

  deleteLieu(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lieux/${id}`);
  }

  getLieuById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/lieux/${id}`);
  }
}
