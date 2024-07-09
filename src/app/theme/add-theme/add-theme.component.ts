import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent implements OnInit {
  submitted = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private formBuilder: FormBuilder
  ) { }
  theme: Theme = {
    id: 0,
    codeTheme: '',
    theme: '',
    typeConvention: '',
    typeThemeIntraInter: '',
    accord: '',
    contrat: '',
    autrePlLib: '',
    documents: '',
    codeFormatExterne: '',
    codeFormateurInterne: '',
    fraisFormateurInterne: 0
  };
  formModel = this.formBuilder.group({
    codeTheme: ['', Validators.required],
    theme: ['', Validators.required],
    typeConvention: ['', Validators.required],
    typeThemeIntraInter: ['', Validators.required],
    accord: ['', Validators.required],
    contrat: ['', Validators.required],
    autrePlLib: ['', Validators.required],
    documents: ['', Validators.required],
    codeFormatExterne: ['', Validators.required],
    codeFormateurInterne: ['', Validators.required],
    fraisFormateurInterne: [0, Validators.required]
  });

  ngOnInit(): void { }

  get f() { return this.formModel.controls; }

  ajouterTheme() {
    this.submitted = true;
    if (this.formModel.invalid) {
      return;
    }



    this.themeService.createTheme(this.theme).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Thème ajouté avec succès',
          showConfirmButton: true
        });
        this.router.navigate(['/themes']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de l\'ajout du thème!',
          showConfirmButton: true
        });
      }
    );
  }
}
