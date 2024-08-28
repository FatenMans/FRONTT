import { Component, OnInit } from '@angular/core';
import { EnrolledFormation } from '../models/enrolledFormation.model';
import { EnrolledFormationService } from '../_services/enrolled-formation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-formations',
  templateUrl: './enrolled-formations.component.html',
  styleUrls: ['./enrolled-formations.component.css']
})
export class EnrolledFormationsComponent implements OnInit {
  enrolledFormations: any[] = [];
  participantId = 1; // Remplacer par l'ID du participant actuel
  formation: any;

  constructor(private enrolledFormationService: EnrolledFormationService,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    this.enrolledFormationService.getFormationsByParticipant(this.participantId)
      .subscribe(data => {
        this.enrolledFormations = data;
      });
  }
  openEvaluationForm(formationId: number): void {
    console.log('Navigating to evaluation form with ID:', formationId); // Debugging log
    this.router.navigate(['/eval', formationId]);  // Navigate to the form
  }
  
}
