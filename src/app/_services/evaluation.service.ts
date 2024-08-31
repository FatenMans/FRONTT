import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvalComponent } from '../eval/eval.component';
import { Evaluation } from '../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {


  private apiUrl = 'http://localhost:8080/api/evaluations';

  constructor(private http: HttpClient) { }

  createEvaluation(partnom: string, formationId: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.apiUrl}/create/${partnom}/${formationId}`, evaluation);
  }
  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.apiUrl);
  }

  deleteById(evalId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${evalId}`);
  }
}