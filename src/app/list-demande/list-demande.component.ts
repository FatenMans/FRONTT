import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  demandes: any[] = []; // Assurez-vous que ce type correspond à votre modèle de données

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.getAlldemande();
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

  acceptDemande(id: number) {
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
            Swal.fire({
              icon: 'success',
              title: 'Demande acceptée avec succès',
            });
            this.getAlldemande(); // Réactualiser la liste des demandes
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de l\'acceptation de la demande',
            });
          }
        );
      }
    });
  }
}
