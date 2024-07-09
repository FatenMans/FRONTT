import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from 'src/app/_services/formateur.service';
import { FormationService } from 'src/app/_services/formation.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
  FormModel: FormGroup;
  formateurs: any[] = [];
  currentFormation: any;
  themes: any


  constructor(
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    private formateurService: FormateurService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.FormModel = this.formBuilder.group({
      nomFormation: ['', Validators.required],
      numGroupe: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      duree: ['', Validators.required],
      typeformation: ['', Validators.required],

      fraisTotalFormateur: ['', Validators.required],
      formateurId: [, Validators.required],
      themeId: [, Validators.required],


    });
  }

  ngOnInit(): void {
    this.loadFormateurs();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.getForamtionById(parseInt(id!))
    this.loadThemes()

  }

  getForamtionById(id: number) {
    this.formationService.getFormationById(id).subscribe({
      next: (data: any) => {
        this.FormModel.patchValue({
          ...data,
          formateurId: data.formateur ? data.formateur.id : null,
          themeId: data.theme ? data.theme.id : null
        });
        console.log(this.FormModel.value)
        console.log(data)
      },
      error: (e: any) => console.error(e)
    });
  }

  loadFormateurs(): void {
    this.formateurService.getFormateurs().subscribe({
      next: (data) => {
        this.formateurs = data;
      },
      error: (e) => console.error(e)
    });
  }
  loadThemes(): void {
    this.themeService.getThemes().subscribe((data: any[]) => {
      this.themes = data;
    });
  }

  // getFormation(id: string): void {
  //   this.formationService.getFormation(parseInt(id)).subscribe({
  //     next: (data) => {
  //       this.currentFormation = data;
  //       this.FormModel.patchValue(this.currentFormation);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  ModifierFormation(): void {
    if (this.FormModel.valid) {
      const updatedFormation = this.FormModel.value;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.formationService.ModifierFormation(parseInt(id), updatedFormation, this.FormModel.value.formateurId, this.FormModel.value.themeId).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Formation modifiée avec succès',
              showConfirmButton: true,
            });



            this.router.navigate(['/list-Formation']);
          },
          error: (e) => console.error(e)
        });
      }
    }
  }
}
