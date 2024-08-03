import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Formateur } from 'src/app/models/formateur.model';
import { FormateurService } from 'src/app/_services/formateur.service';

@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.css']
})
export class AddFormateurComponent implements OnInit {
  formateur = new Formateur();
  formateurs: any[] = []; // List of formateurs
  submitted = false;

  constructor(private router: Router, private formateurService: FormateurService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    // Fetch all formateurs
    this.formateurService.getFormateurs().subscribe(
      data => this.formateurs = data,
      error => console.log(error)
    );
  }

  formModel = this.formbuilder.group({
    code: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    cin: ['', Validators.required],
    matricule: ['', Validators.required],
    tel: ['', Validators.required],
    montant: ['', Validators.required],
    autorisation: ['', Validators.required],
    typeFormateur: ['', Validators.required],
  });

  get f() { return this.formModel.controls; }

  ajouterFormateur() {
    this.submitted = true;
    console.log(this.formModel.value);

    if (this.formModel.invalid) {
      return;
    }

    // Check for duplicate CIN
    const duplicateFormateur = this.formateurs.find(f => f.cin === this.formModel.value.cin);
    if (duplicateFormateur) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Un formateur avec ce CIN existe déjà!',
        showConfirmButton: true,
      });
      return;
    }

    this.formateurService.createFormateur(this.formModel.value).subscribe(
      res => {
        console.log(res);
        console.log("Formateur ajouté avec succès");

        Swal.fire({
          icon: 'success',
          title: 'Formateur ajouté avec succès',
          showConfirmButton: true,
        });
        this.router.navigate(['/list-Formateur']);
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de l\'ajout du formateur!',
          showConfirmButton: true,
        });
      }
    );
  }
}
