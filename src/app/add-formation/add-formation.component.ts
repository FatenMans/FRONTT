import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormationService } from '../_services/formation.service';
import Swal from 'sweetalert2'; // Import the 'Swal' object from the 'sweetalert2' library

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent {
  formation: any;
  submitted = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formationService: FormationService,
    private formBuilder: FormBuilder
  ) { }

  FormModel = this.formBuilder.group({
    NomFormation: ['', Validators.required],
    numGroupe: ['', Validators.required],
    duree: ['', Validators.required],
    prix: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    CodeFormation: ['', Validators.required],
    type: ['', Validators.required]
  });

  get f() { return this.FormModel.controls; }

  ajouterFormation() {
    this.submitted = true;

    if (this.FormModel.invalid) {
      return;
    }

    this.formation = this.FormModel.value;

    this.formationService.createFormation(this.formation).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Formation ajoutée avec succès',
          showConfirmButton: true,
        });
        this.router.navigate(['/formations']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Erreur lors de l'ajout de la formation",
          showConfirmButton: true,
        });
      }
    );
  }
}
