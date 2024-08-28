import { Component } from '@angular/core';
import { PdfService } from '../_services/pdf.service';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../_services/evaluation.service';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css']
})
export class EvalComponent {
  formationId: number | null = null;
  evaluation: any = {};  // Initialize an evaluation object

  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.formationId = Number(this.route.snapshot.paramMap.get('formationId'));
  }

  submitEvaluation() {
    if (this.formationId !== null) {
      this.evaluationService.createEvaluation(1, this.formationId, this.evaluation)
        .subscribe(response => {
          console.log('Evaluation submitted successfully', response);
          // Handle success, navigate back or show a success message
        }, error => {
          console.error('Error submitting evaluation', error);
          // Handle error
        });
    }
  }
}
