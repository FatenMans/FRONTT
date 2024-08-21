import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../_services/participant.service';
import { FormationService } from '../_services/formation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-participant',
  templateUrl: './list-participant.component.html',
  styleUrls: ['./list-participant.component.css']
})
export class ListParticipantComponent implements OnInit {

  participants: any[] = [];
  formations: any[] = [];
  selectedFormationId: number | null = null;
  selectedParticipantId: number | null = null; // Added to track the participant being invited
  role: string = ''; // Add logic to set the user's role

  constructor(
    private participantService: ParticipantService,
    private formationService: FormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getParticipants();
    this.getFormations();
  }

  private getParticipants() {
    this.participantService.getParticipants().subscribe(
      data => {
        console.log('Participants fetched from backend:', data);
        this.participants = data;
      },
      error => {
        console.error('Error fetching participants:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors du chargement des participants',
          text: 'Veuillez réessayer plus tard.',
        });
      }
    );
  }

  private getFormations() {
    this.formationService.getFormation().subscribe(
      data => {
        this.formations = data;
      },
      error => {
        console.error('Error fetching formations:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors du chargement des formations',
          text: 'Veuillez réessayer plus tard.',
        });
      }
    );
  }

  setParticipantToInvite(participantId: number) {
    this.selectedParticipantId = participantId;
  }

  inviteParticipant() {
    if (!this.selectedFormationId) {
      Swal.fire({
        icon: 'warning',
        title: 'Veuillez sélectionner une formation',
        text: 'Vous devez choisir une formation avant d\'inviter un participant.',
      });
      return;
    }

    if (this.selectedParticipantId === null) {
      Swal.fire({
        icon: 'error',
        title: 'Participant non sélectionné',
        text: 'Veuillez sélectionner un participant.',
      });
      return;
    }

    this.formationService.inviteParticipant(this.selectedParticipantId, this.selectedFormationId).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Participant invité avec succès',
          showConfirmButton: true,
        });
        this.selectedParticipantId = null;  // Reset after inviting
        this.selectedFormationId = null;    // Reset the formation selection
      },
      error => {
        console.error('Error inviting participant:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'invitation du participant',
          text: 'Veuillez réessayer plus tard.',
        });
      }
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
              title: 'Participant supprimé avec succès',
              showConfirmButton: true,
            });
            this.getParticipants();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression du participant",
              showConfirmButton: true,
            });
          }
        );
      }
    });
  }

  updateParticipant(id: number) {
    alert('Update participant with ID: ' + id); // This can be updated to navigate to an edit page if required
  }
}
