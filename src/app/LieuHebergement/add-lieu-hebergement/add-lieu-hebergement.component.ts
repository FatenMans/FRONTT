import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LieuhebService } from 'src/app/_services/lieuheb.service';
import { Lieuheb } from 'src/app/models/lieuheb.model'; // Import du modèle Lieuheb
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lieu-hebergement',
  templateUrl: './add-lieu-hebergement.component.html',
  styleUrls: ['./add-lieu-hebergement.component.css']
})
export class AddLieuHebergementComponent {
  lieuheb: Lieuheb = {
    lieuheb: '',
    id: 0
  };// Déclaration d'une nouvelle instance de Lieuheb
  submitted = false;

  constructor(private router: Router, private lieuhebService: LieuhebService, private formbuilder: FormBuilder) { }

  formModel = this.formbuilder.group({
    lieuheb: ['', Validators.required]
  });

  get f() { return this.formModel.controls; }

  ngOnInit(): void { }

  ajouterLieuheb() {
    console.log(this.formModel.value)
    if (this.formModel.valid) {
      const newLieuheb: Lieuheb = {
        lieuheb: this.formModel.value.lieuheb!,
        id: 0  // ou toute autre valeur par défaut appropriée
      };

      this.lieuhebService.createLieuHeb(newLieuheb).subscribe(
        response => {
          console.log('lieuheb ajouté avec succès', response);
          // Rediriger ou afficher un message de succès
          Swal.fire({
            icon: 'success',
            title: 'lieu ajouté avec succès',
            showConfirmButton: true,
          });
          this.router.navigate(['/lieuHebergement']);
        },
        error => {
          console.error('Erreur lors de l\'ajout du lieuHebergement', error);
        }
      );
    }
  }
}