import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl } from '@angular/forms';
import { FormationService } from 'src/app/_services/formation.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationsComponent implements OnInit {
  [x: string]: any;
  formations: any[] = [];
  formation : any
  isUser: boolean = false;
  userId: any

  constructor(private formationService: FormationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getFormations();
    this.isUser = this['authService'].isUserRole(); // Assuming authService has a method to check user role
    this.userId = this['authService'].getUserId(); // Assu

    this['myForm'] = this.fb.group({
      typeFormateur: new FormControl('')
      // Autres contrôles de formulaire ici
    });
  }
  loadFormationsForParticipant(): void {
    const participantId = 1; // Remplacer par l'ID du participant authentifié (vous devrez implémenter la gestion de l'authentification)
    this.formationService.getFormationsByParticipant(participantId).subscribe(
      formations => {
        this.formations = formations;
      },
      error => {
        console.error('Error fetching formations:', error);
        // Gérer l'erreur comme nécessaire
      }
    );
  }
  participer(formationId: number): void {
    this.formationService.addParticipantToFormation(formationId, this.userId).subscribe(() => {
      alert('Vous avez participé avec succès à la formation.');
    });
  }

  private getFormations() {
    this.formationService.getFormation().subscribe(
      data => {
        console.log('Formations fetched from backend:', data);
        this.formations = data;
      },

    );
  }
  deleteFormation(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette formation?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formationService.deleteFormation(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Formation supprimée avec succès',
              showConfirmButton: true,
            });
            this.getFormations()

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
  updateFormation(id: number) {
    alert('Update Formation with ID: ' + id); // Simple alert instead of navigating to another route
  }



}
