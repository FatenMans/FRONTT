import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LieuhebService } from 'src/app/_services/lieuheb.service';
import { Lieuheb } from 'src/app/models/lieuheb.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lieu-hebergement',
  templateUrl: './lieu-hebergement.component.html',
  styleUrls: ['./lieu-hebergement.component.css']
})
export class LieuHebergementComponent implements OnInit {
  lieux: Lieuheb[] = [];
  lieu: any;

  constructor(private lieuhebService: LieuhebService, private router: Router) { }

  ngOnInit(): void {
    this.getLieux();
  }

  private getLieux() {
    this.lieuhebService.getLieu().subscribe(
      data => {
        console.log('Lieux fetched from backend:', data);
        this.lieux = data; // Mise à jour de this.lieux
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  deleteLieuheb(id: number) {
    {
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
          this.lieuhebService.deleteLieuheb(id).subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: 'Formation supprimée avec succès',
                showConfirmButton: true,
              });
              this.getLieux()

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




  }
}
