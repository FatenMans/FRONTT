import { Component } from '@angular/core';
import { LieuService } from '../_services/lieu.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Lieu } from '../models/lieu.model';

@Component({
  selector: 'app-add-lieu',
  templateUrl: './add-lieu.component.html',
  styleUrls: ['./add-lieu.component.css']
})
export class AddLieuComponent {
  lieu: Lieu = { id: 0, lieu: '', formations: [] }; // Initialiser correctement l'objet lieu
  Lieu: any[] = [];
  submitted = false;
  
  constructor(private router: Router, private lieuService: LieuService, private formbuilder: FormBuilder) { }

  formModel = this.formbuilder.group({
    lieu: ['', Validators.required],
  });

  get f() { return this.formModel.controls; }

  updateLieuFromForm() {
    this.lieu.lieu = this.formModel.get('lieu')?.value || '';
  }

  ajouterLieu() {
    this.submitted = true;
    this.updateLieuFromForm();
    console.log(this.lieu);
    if (this.formModel.invalid) {
      return;
    }
    this.lieuService.createLieu(this.lieu).subscribe(res => {
      console.log(res);
      console.log("Lieu ajouté avec succès");

      Swal.fire({
        icon: 'success',
        title: 'Lieu ajouté avec succès',
        showConfirmButton: true,
      });

      this.router.navigate(['/lieu']);
    }, err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur lors de l\'ajout du lieu!',
        showConfirmButton: true,
      });
    });
  }
}
