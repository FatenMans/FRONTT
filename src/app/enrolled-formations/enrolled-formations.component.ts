import { Component, OnInit } from '@angular/core';
import { FormationService } from '../_services/formation.service';

@Component({
  selector: 'app-enrolled-formations',
  templateUrl: './enrolled-formations.component.html',
  styleUrls: ['./enrolled-formations.component.css']
})
export class EnrolledFormationsComponent implements OnInit {

  formations: any[] = [];

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    const participantId = Number(localStorage.getItem('participantId'));
    if (participantId) {
      this.formationService.getFormationsByParticipant(participantId).subscribe(data => {
        this.formations = data;
      }, error => {
        console.error('Error fetching enrolled formations:', error);
      });
    }
  }
}
