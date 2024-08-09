import { Component, OnInit } from '@angular/core';
import { PlanFormationService } from 'src/app/_services/planformation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { PlanFormation } from 'src/app/models/planformation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-actionformation',
  templateUrl: './list-actionformation.component.html',
  styleUrls: ['./list-actionformation.component.css']
})
export class ListActionformationComponent implements OnInit {
  planFormations: PlanFormation[] = [];
  filteredPlanFormations: PlanFormation[] = [];
  themes: any[] = [];
  selectedTheme: string = '';

  constructor(
    private planformationService: PlanFormationService, 
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.getThemes();
    this.getAllPlanFormations();
  }

  private getThemes() {
    this.themeService.getThemes().subscribe(
      data => {
        this.themes = data;
        console.log('Themes fetched from backend:', data);
      }
    );
  }

  private getAllPlanFormations() {
    this.planformationService.getAllPlanFormations().subscribe(data => {
      this.planFormations = data;
      this.filteredPlanFormations = data;
    });
  }

  searchByTheme() {
    if (this.selectedTheme) {
      this.planformationService.searchByTheme(this.selectedTheme).subscribe(
        data => {
          this.filteredPlanFormations = data;
        },
        error => {
          console.error('Error fetching data by theme', error);
        }
      );
    } else {
      this.getAllPlanFormations();
    }
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
            this.getAllPlanFormations(); // Refresh the list after deletion
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression de l'Action",
              showConfirmButton: true,
            });
          }
        );
      }
    });
  }
}
