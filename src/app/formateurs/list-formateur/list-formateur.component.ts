import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from 'src/app/_services/formateur.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-formateurs',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.css']
})
export class ListFormateursComponent implements OnInit {
  formateurs: any[] = [];

  constructor(private formateurService: FormateurService, private router: Router) { }

  ngOnInit(): void {
    this.getFormateurs();
  }

  private getFormateurs() {
    this.formateurService.getFormateurs().subscribe(
      data => {
        console.log(data)
        console.log('Formateurs fetched from backend:', data);
        this.formateurs = data;
      },

    );
  }
  deleteFormateur(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette formateur?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formateurService.deleteFormateur(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Formation supprimée avec succès',
              showConfirmButton: true,
            });
            this.getFormateurs()

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
  updateFormateur(id: number) {
    alert('Update CabinetFormation with ID: ' + id); // Simple alert instead of navigating to another route
  }



}
