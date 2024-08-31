import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrolledFormation } from '../models/enrolledFormation.model';

@Injectable({
  providedIn: 'root'
})
export class EnrolledFormationService {
  private apiUrl = 'http://localhost:8080/api/formations';

  constructor(private http: HttpClient) { }

  getFormationsByParticipant(partNom: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-participant/${partNom}`);
  }
}
