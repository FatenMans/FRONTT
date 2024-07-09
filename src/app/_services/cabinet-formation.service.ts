import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CabinetFormation } from '../models/CabinetFormation.model';

@Injectable({
  providedIn: 'root'
})
export class CabinetFormationService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getCabinetFormation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/cabinetformations/all');
  }

  createCabinetFomration(cabinetFormation: any) {
    return this.http.post<any>(this.apiUrl + '/cabinetformarions/create', cabinetFormation);
  }
  update(id: number, data: CabinetFormation): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCabinetFormation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}