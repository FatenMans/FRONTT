import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvalComponent } from '../eval/eval.component';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  private apiUrl = 'http://localhost:8080/api/evaluations';

  constructor(private http: HttpClient) {}

  createEvaluation(participantId: number, formationId: number, evaluation: any): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}${this.apiUrl}/create/${participantId}/${formationId}`, evaluation);

}
}