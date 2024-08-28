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
  selectedParticipant: string = '';
  selectedParticipantId: number | null = null;
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
        console.log(this.formations);
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

  setParticipantToInvite(participant: string) {
    this.selectedParticipant = participant;
  }

  participer(): void {
    console.log(this.selectedParticipant);
    console.log(this.selectedFormationId);
    if (this.selectedFormationId) {
      this.formationService.addParticipantToFormation(this.selectedFormationId, this.selectedParticipant).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Vous avez participé avec succès à la formation.',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Erreur lors de l\'ajout du participant à la formation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Avertissement',
        text: 'Nom du participant non trouvé. Veuillez vous reconnecter.',
        confirmButtonText: 'OK'
      });
    }
  }



  deleteParticipant(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce participant?',
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
    alert('Mise à jour du participant avec ID: ' + id);
    // Naviguer vers une page d'édition si nécessaire
  }
}
