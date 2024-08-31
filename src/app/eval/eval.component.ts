import { Component, OnInit } from '@angular/core';
import { PdfService } from '../_services/pdf.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../_services/evaluation.service';
import { Validators } from '@angular/forms';
import { Evaluation } from '../models/evaluation.model';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css']
})
export class EvalComponent implements OnInit {
  participantId!: number;
  formationId!: number;
  evaluation: Evaluation = { note: 0, commentaire: '' };

  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  submitEvaluation(): void {
    this.evaluationService.createEvaluation(this.participantId, this.formationId, this.evaluation)
      .subscribe(response => {
        alert('Évaluation soumise avec succès !');
        this.router.navigate(['/list-eval']); // Redirige vers la liste des formations inscrites
      }, error => {
        console.error('Erreur lors de la soumission de l\'évaluation :', error);
      });
  }
}