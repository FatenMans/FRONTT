import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl } from '@angular/forms';
import { FormationService } from 'src/app/_services/formation.service';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { ThemeService } from 'src/app/_services/theme.service';
import { ParticipantService } from 'src/app/_services/participant.service';


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
  userId: any;
  participantnom: any;
  role:any;
  themes:any

  constructor(private formationService: FormationService, private router: Router, private fb: FormBuilder, private themeService: ThemeService,
    private participantService: ParticipantService
  ) { }

  ngOnInit(): void {
    this.getFormations();
   
   
    this.getRole()
    this['myForm'] = this.fb.group({
      typeFormateur: new FormControl('')
      // Autres contrôles de formulaire ici
    });
  }
  
  participer(formationId: number): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user)
    const participant = { nom: user?.userName };

    if (participant.nom) {
        this.formationService.addParticipantToFormation(formationId, participant.nom).subscribe(

            () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Vous avez participé avec succès à la formation.',
                  
                    confirmButtonText: 'OK'

                });
                this.router.navigate(['/enrolled-formations'])
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

  private getFormations() {
    this.formationService.getFormation().subscribe(
      data => {
        console.log('Formations fetched from backend:', data);
        this.formations = data;
      },

    );
  }
  getRole() {
    this.role = JSON.parse(localStorage.getItem("roles")!)
    console.log(this.role)

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
