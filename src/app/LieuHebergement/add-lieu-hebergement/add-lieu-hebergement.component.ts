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

  ajouterLieuheb() {
    this.submitted = true;
    console.log(this.lieuheb);
    if (this.formModel.invalid) {
      return;
    }
    this.lieuhebService.createLieuHeb(this.lieuheb).subscribe((res: Lieuheb) => {
      console.log(res);
      console.log("Lieu d'hébergement ajouté avec succès");

      Swal.fire({
        icon: 'success',
        title: 'Lieu d\'hébergement ajouté avec succès',
        showConfirmButton: true,
      });

      this.router.navigate(['/lieux-hebergement']);
    }, (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur lors de l\'ajout du lieu d\'hébergement!',
        showConfirmButton: true,
      });
    });
  }
}
