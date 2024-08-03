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

  getCabinetFormation(): Observable<CabinetFormation[]> {
    return this.http.get<any[]>(this.apiUrl + '/cabinetformations/all');
  }

  createCabinetFormation(CabinetFormation: CabinetFormation, idLieu: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cabinetformations/create/${idLieu}`, CabinetFormation);
  }

  updateCabinetFormation(id: number, data: CabinetFormation): Observable<any> {
    return this.http.put(`${this.apiUrl}/cabinetformations/${id}`, data);
  }

  deleteCabinetFormation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cabinetformations/${id}`);
  }
  getCabinetFormationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cabinetformations/${id}`);
  }
}