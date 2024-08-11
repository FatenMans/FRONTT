import { Component, OnInit } from '@angular/core';
import { EnrolledFormation } from '../models/enrolledFormation.model';
import { EnrolledFormationService } from '../_services/enrolled-formation.service';

@Component({
  selector: 'app-enrolled-formations',
  templateUrl: './enrolled-formations.component.html',
  styleUrls: ['./enrolled-formations.component.css']
})
export class EnrolledFormationsComponent implements OnInit {
  enrolledFormations: any[] = [];
  participantId = 1; // Remplacer par l'ID du participant actuel

  constructor(private enrolledFormationService: EnrolledFormationService) { }

  ngOnInit(): void {
    this.enrolledFormationService.getFormationsByParticipant(this.participantId)
      .subscribe(data => {
        this.enrolledFormations = data;
      });
  }
}
