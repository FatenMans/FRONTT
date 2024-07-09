import { Component } from '@angular/core';
import { ParticipantService } from '../_services/participant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-participant',
  templateUrl: './list-participant.component.html',
  styleUrls: ['./list-participant.component.css']
})
export class ListParticipantComponent {
  participants: any[] = [];

  constructor(private participantService: ParticipantService, private router: Router) { }

  ngOnInit(): void {
    this.getParticipants();
  }

  private getParticipants() {
    this.participantService.getParticipant().subscribe(
      data => {
        console.log('Participants fetched from backend:', data);
        this.participants = data;
      },

    );
  }


}



