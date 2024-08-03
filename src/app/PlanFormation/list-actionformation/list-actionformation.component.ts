import { Component } from '@angular/core';
import { LieuService } from 'src/app/_services/lieu.service';
import { PlanFormationService } from 'src/app/_services/planformation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { PlanFormation } from 'src/app/models/planformation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-actionformation',
  templateUrl: './list-actionformation.component.html',
  styleUrls: ['./list-actionformation.component.css']
})
export class ListActionformationComponent {
  planFormations: PlanFormation[] = [];
themes: any
lieu: any
  constructor(private planformationService: PlanFormationService, private themeService: ThemeService, 
    private lieuService: LieuService) { }

  ngOnInit(): void {
    this.planformationService.getAllPlanFormations().subscribe(data => {
      this.planFormations = data;
    });
    
  }
  private getThemes() {
    this.themeService.getThemes().subscribe(
      data => {
        console.log(data)
        console.log('Theme fetched from backend:', data);
        this.themes = data;
      },

    );
  }
  private getLieux() {
    this.lieuService.getLieu().subscribe(
      data => {
        console.log('Lieux fetched from backend:', data);
        this.lieu = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  deleteActionFormation(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette Action?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planformationService.deletePlanFormation(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Action supprimée avec succès',
              showConfirmButton: true,
            });
            this.getLieux();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression de la Action",
              showConfirmButton: true,
            });
          }
        );
      }
    });
  }

  updateLieu(id: number) {
    alert('Update Lieu with ID: ' + id); // Simple alert instead of navigating to another route
  }
}