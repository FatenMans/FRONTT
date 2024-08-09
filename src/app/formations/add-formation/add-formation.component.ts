import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import the 'Swal' object from the 'sweetalert2' library
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import { FormateurService } from 'src/app/_services/formateur.service';
import { Participant } from 'src/app/models/participant.model';
import { ParticipantService } from 'src/app/_services/participant.service';

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
    private participantService: ParticipantService,


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
    themeId: [],


  });

  ngOnInit(): void {
    this.getFormateurs();
    this.loadThemes();
    this.setupDateChangeListeners();
   
    }
 
  getFormateurs() {
    this.formateurService.getFormateurs().subscribe((data: any[]) => {
      console.log('Formateurs data:', data);
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
  setupDateChangeListeners(): void {
    const dateDebutControl = this.FormModel.get('dateDebut');
    const dateFinControl = this.FormModel.get('dateFin');
  
    if (dateDebutControl) {
      dateDebutControl.valueChanges.subscribe(() => this.calculateDuration());
    } else {
      console.warn('DateDebut control is not found');
    }
  
    if (dateFinControl) {
      dateFinControl.valueChanges.subscribe(() => this.calculateDuration());
    } else {
      console.warn('DateFin control is not found');
    }
  }
  
  calculateDuration(): void {
    const dateDebutValue = this.FormModel.get('dateDebut')!.value;
    const dateFinValue = this.FormModel.get('dateFin')!.value;
  
    if (dateDebutValue && dateFinValue) {
      const dateDebut = new Date(dateDebutValue);
      const dateFin = new Date(dateFinValue);
  
      if (dateDebut instanceof Date && !isNaN(dateDebut.getTime()) && 
          dateFin instanceof Date && !isNaN(dateFin.getTime()) && dateFin > dateDebut) {
        const timeDiff = Math.abs(dateFin.getTime() - dateDebut.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + ' Jr';
        this.FormModel.get('duree')!.setValue(diffDays, { emitEvent: false });
      } else {
        this.FormModel.get('duree')!.setValue('');
      }
    }
  }
  
  get f() { return this.FormModel.controls; }

  ajouterFormation() {
    this.submitted = true;


    console.log("faten")

    console.log(this.FormModel.value)

    if (this.FormModel.invalid) {
      return;
    }

    console.log("faten1")

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