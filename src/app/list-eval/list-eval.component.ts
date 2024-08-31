import { Component } from '@angular/core';
import { Evaluation } from '../models/evaluation.model';
import { EvaluationService } from '../_services/evaluation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-eval',
  templateUrl: './list-eval.component.html',
  styleUrls: ['./list-eval.component.css']
})
export class ListEvalComponent {
  evaluations: any[] = []
  constructor(private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.getAll();

  }
  deleteEval(evalu: any) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette évaluation?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluationService.deleteById(evalu).subscribe(res => {
          console.log(res);
          this.getAll();

          Swal.fire(
            'Supprimé!',
            'Votre évaluation a été supprimée.',
            'success'
          )
        })

      }
    })

  }

  getAll() {
    this.evaluationService.getAllEvaluations().subscribe(data => {
      this.evaluations = data;
      console.log('Evaluations:', this.evaluations); // Check this in console

    });
  }




}
