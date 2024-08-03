import { Component } from '@angular/core';
import { ParticipantService } from '../_services/participant.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.participantService.getParticipants().subscribe(
      data => {
        console.log('Participants fetched from backend:', data);
        this.participants = data;
      },

    );
  }
  deleteParticipant(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette participant?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participantService.deleteParticipant(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Formation supprimée avec succès',
              showConfirmButton: true,
            });
            this.getParticipants()

          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression de la formation",
              showConfirmButton: true,
            });
          }
        );
      }
    })

  }
  updateParticipant(id: number) {
    alert('Update participant with ID: ' + id); // Simple alert instead of navigating to another route
  }

}



