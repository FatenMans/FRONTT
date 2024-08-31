import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import Swal from 'sweetalert2';
import { ParticipantService } from '../_services/participant.service';
import { saveAs } from 'file-saver';
import { FormateurService } from '../_services/formateur.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  demandes: any[] = []; // Assurez-vous que ce type correspond à votre modèle de données
  formateurs: any
  constructor(private demandeService: DemandeService,
    private participantService: ParticipantService,
    private formateurService: FormateurService
  ) { }

  ngOnInit(): void {
    this.getAlldemande();
    this.getAllFormateurs();
  }

  getAlldemande(): void {
    this.demandeService.getAllDemandes().subscribe(
      data => {
        console.log('Demandes fetched from backend:', data);
        this.demandes = data;
      },
      err => {
        console.error('Error fetching demandes', err);
      }
    );
  }
  getAllFormateurs(): void {
    this.formateurService.getFormateurs().subscribe(
      data => {
        console.log('Formateurs fetched from backend:', data);
        this.formateurs = data;
      },
      err => {
        console.error('Error fetching formateurs', err);
      }
    );
  }



  refuserDemande(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir refuser cette demande?',
      text: "Cette action marquera la demande comme non validée!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, refuser!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.refuserDemande(id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Demande refusée avec succès',
            });
            this.getAlldemande(); // Réactualiser la liste des demandes
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors du refus de la demande',
              text: err.message
            });
          }
        );
      }
    });
  }
  convertToFormateur(id: number): void {
    this.participantService.convertParticipant(id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Participant converti en Formateur avec succès',
          showConfirmButton: true,
        });
        this.getAlldemande();
        // Reload the participant list
      },
      error => {
        console.error('Error converting participant:', error);
        Swal.fire({
          icon: 'success',
          title: 'Participant converti en Formateur avec succès',
          showConfirmButton: true,
        });

      }
    );
  }

  acceptDemande(id: number, participantId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir accepter cette demande?',
      text: "Cette action ne peut pas être annulée!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, acceptez!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.acceptDemande(id).subscribe(
          () => {
            this.getAlldemande(); // Réactualiser la liste des demandes

            this.convertToFormateur(participantId)

          },

        );
      }
    });
  }
  downloadFile(fileName: string): void {
    this.participantService.downloadFile(fileName).subscribe(
      (blob: Blob) => {
        console.log('Blob:', blob);
        saveAs(blob, fileName);
      },
      error => {
        console.error('Erreur lors du téléchargement du fichier', error);
      }
    );
  }

}
