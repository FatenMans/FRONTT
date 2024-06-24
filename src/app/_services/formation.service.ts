import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getFormation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/formations/');
  }
  createFormation(formations: any) {
    return this.http.post<any>(this.apiUrl + '/formations/', formations);
  }


}
