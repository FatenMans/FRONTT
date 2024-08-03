// components/add-actionformation/add-actionformation.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import the 'Swal' object from the 'sweetalert2' library
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { FormateurService } from 'src/app/_services/formateur.service';
import { LieuService } from 'src/app/_services/lieu.service';
import { PlanFormationService } from 'src/app/_services/planformation.service';

@Component({
  selector: 'app-add-actionformation',
  templateUrl: './add-actionformation.component.html',
  styleUrls: ['./add-actionformation.component.css']
})
export class AddActionFormationComponent implements OnInit {

  actionFormation: any;
  submitted = false;
  themes: Theme[] = [];

  lieux: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private planformationService: PlanFormationService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,

    private lieuService: LieuService // Assurez-vous d'avoir ce service
  ) { }

  FormModel = this.formBuilder.group({
    code_action: ['', Validators.required],
    groupe_N: ['', Validators.required],
    dateDebut: ['', Validators.required],
    datefin: ['', Validators.required],
    duree: ['', Validators.required],
    NbreCandidat: ['', Validators.required],

    themeId: ['', Validators.required],
    lieuId: [[], Validators.required] // Multiple selection
  });

  ngOnInit(): void {

    this.loadThemes();
    this.loadLieux();
    this.setupDateChangeListeners();

  }



  loadThemes(): void {
    this.themeService.getThemes().subscribe((data: Theme[]) => {
      this.themes = data;
    });
  }

  loadLieux(): void {
    this.lieuService.getLieu().subscribe((data: any[]) => {
      this.lieux = data;
    });
  }
  setupDateChangeListeners(): void {
    this.FormModel.get('dateDebut')!.valueChanges.subscribe(() => this.calculateDuration());
    this.FormModel.get('datefin')!.valueChanges.subscribe(() => this.calculateDuration());
  }

  calculateDuration(): void {
    const dateDebutValue = this.FormModel.get('dateDebut')!.value;
    const dateFinValue = this.FormModel.get('datefin')!.value;

    if (dateDebutValue && dateFinValue) {
      const dateDebut = new Date(dateDebutValue);
      const dateFin = new Date(dateFinValue);

      if (dateDebut && dateFin && dateFin > dateDebut) {
        const timeDiff = Math.abs(dateFin.getTime() - dateDebut.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)).toString() + ' Jr';
        this.FormModel.get('duree')!.setValue(diffDays);
      } else {
        this.FormModel.get('duree')!.setValue('');
      }
    }
  }


  get f() { return this.FormModel.controls; }

  ajouterActionformation() {
    this.submitted = true;
    console.log(this.FormModel.value)



    if (this.FormModel.invalid) {
      return;
    }
    this.actionFormation = this.FormModel.value;

    this.planformationService.createPlanFormation(this.actionFormation, Number(this.FormModel.value.themeId), (this.FormModel.value.lieuId!)).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Formation ajoutée avec succès',
          showConfirmButton: true,
        });
        this.router.navigate(['/list-actionformation']);
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