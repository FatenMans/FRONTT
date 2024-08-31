import { Component, OnInit } from '@angular/core';
import { EnrolledFormationService } from '../_services/enrolled-formation.service';
import { Router } from '@angular/router';
import { EvaluationService } from '../_services/evaluation.service';
import { Evaluation } from '../models/evaluation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrolled-formations',
  templateUrl: './enrolled-formations.component.html',
  styleUrls: ['./enrolled-formations.component.css']
})
export class EnrolledFormationsComponent implements OnInit {
  enrolledFormations: any[] = [];
  participantId = 1; // Replace with actual participant ID
  selectedFormation: any = null;
  evaluation: Evaluation = { note: 0, commentaire: '' };
  formation: any
  participantNom!: string

  constructor(
    private enrolledFormationService: EnrolledFormationService,
    private router: Router,
    private evaluationService: EvaluationService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user')!;
    const userObj = JSON.parse(user);
    this.participantNom = userObj.userName;
    console.log(this.participantNom)

    this.enrolledFormationService.getFormationsByParticipant(this.participantNom)
      .subscribe(data => {
        this.enrolledFormations = data;
        console.log(this.enrolledFormations)
      });
  }

  selectFormation(formation: any): void {
    if (formation) {
      console.log('Selected Formation:', formation); // Should log the selected formation object
      this.selectedFormation = formation;
    } else {
      console.error('Formation object is undefined');
    }
  }
  submitEvaluation(): void {
    if (this.selectedFormation) {
      console.log('Selected Formation:', this.selectedFormation);
      console.log('Evaluation:', this.evaluation);
      this.evaluationService.createEvaluation(this.participantNom, this.selectedFormation.id, this.evaluation).subscribe(res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Evaluation ajoutée avec succès',
          showConfirmButton: true,
        })
      }, err => {
        Swal.fire({
          icon: 'success',
          title: 'Evaluation ajoutée avec succès',
          showConfirmButton: true,
        })
      })
    }

  }
  cancelEvaluation(): void {
    this.selectedFormation = null; // Clear selection and reset form
    this.evaluation = { note: 0, commentaire: '' }; // Reset evaluation object
  }
}
