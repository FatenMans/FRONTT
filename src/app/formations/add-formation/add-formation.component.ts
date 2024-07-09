import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import the 'Swal' object from the 'sweetalert2' library
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { FormateurService } from 'src/app/_services/formateur.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent {
  formation: any;
  submitted = false;
  themes: any[] = [];
  formateurs: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private formationService: FormationService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private formateurService: FormateurService,


  ) { }

  FormModel = this.formBuilder.group({
    nomFormation: ['', Validators.required],
    numGroupe: ['', Validators.required],
    duree: ['', Validators.required],
    fraisTotalFormateur: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],

    typeformation: ['', Validators.required],
    formateurId: [, Validators.required],
    themeId: [, Validators.required],


  });

  ngOnInit(): void {
    this.getFormateurs();
    this.loadThemes();
  }
  getFormateurs() {
    this.formateurService.getFormateurs().subscribe((data: any[]) => {
      this.formateurs = data;
    }, error => {
      console.error('Error fetching formateurs:', error);
    });
  }
  loadThemes(): void {
    this.themeService.getThemes().subscribe((data: Theme[]) => {
      this.themes = data;
    });
  }

  get f() { return this.FormModel.controls; }

  ajouterFormation() {
    this.submitted = true;

    if (this.FormModel.invalid) {
      return;
    }

    this.formation = this.FormModel.value;

    this.formationService.createFormation(this.formation, this.FormModel.value.formateurId!, this.FormModel.value.themeId!).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Formation ajoutée avec succès',
          showConfirmButton: true,
        });
        this.router.navigate(['/list-Formation']);
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