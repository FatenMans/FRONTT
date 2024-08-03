import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabinetFormationService } from 'src/app/_services/cabinet-formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cabinet',
  templateUrl: './list-cabinet.component.html',
  styleUrls: ['./list-cabinet.component.css']
})
export class ListCabinetComponent implements OnInit {
  cabinetFormations: any[] = [];

  constructor(private cabinetFormationService: CabinetFormationService, private router: Router) { }

  ngOnInit(): void {
    this.getCabinetFormation();
  }

  private getCabinetFormation() {
    this.cabinetFormationService.getCabinetFormation().subscribe(
      data => {
        console.log('CabinetFormation fetched from backend:', data);
        this.cabinetFormations = data;
      },
      error => {
        console.error('Error fetching CabinetFormations:', error);
        // Gérer l'erreur comme nécessaire
      }
    );
  }

  deleteCabinetFormation(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette Cabinet?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cabinetFormationService.deleteCabinetFormation(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Cabinet supprimée avec succès',
              showConfirmButton: true,
            });
            this.getCabinetFormation()

          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression de la Cabinet",
              showConfirmButton: true,
            });
          }
        );
      }
    })
  }
  updateCabinetFormation(id: number) {
    alert('Update Cabinet with ID: ' + id); // Simple alert instead of navigating to another route
  }



}
