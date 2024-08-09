import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/_services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent implements OnInit {

  themeForm: FormGroup;
  submitted = false;
  f:any

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.themeForm = this.fb.group({
      codeTheme: ['', Validators.required],
      theme: ['', Validators.required],
      typeFormation: ['', Validators.required],
      accord: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ajouterTheme() {
    this.submitted = true;

    if (this.themeForm.valid) {
      console.log(this.themeForm.value)
      // Envoyez les données du formulaire directement
      this.themeService.createTheme(this.themeForm.value).subscribe(
        response => {
          console.log('Theme ajouté avec succès', response);
          Swal.fire({
            icon: 'success',
            title: 'Theme ajouté avec succès',
            showConfirmButton: true
          });
          this.router.navigate(['/list-theme']);
        },
        error => {
          console.error('Erreur lors de l\'ajout du thème', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de l\'ajout du thème',
            text: 'Veuillez réessayer plus tard.',
            showConfirmButton: true
          });
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}
