// edit-formateur.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateurService } from 'src/app/_services/formateur.service';
import { ThemeService } from 'src/app/_services/theme.service';
import { Formateur } from 'src/app/models/formateur.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-formateur',
  templateUrl: './edit-formateur.component.html',
  styleUrls: ['./edit-formateur.component.css']
})
export class EditFormateurComponent implements OnInit {
  formModel!: FormGroup;
  formateur: Formateur = new Formateur();

  submitted = false;
themes: any;

  constructor(
    private formBuilder: FormBuilder,
    private formateurService: FormateurService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formModel = this.formBuilder.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      cin: ['', Validators.required],
      matricule: ['', Validators.required],
      tel: ['', Validators.required],
     
      autorisation: ['', Validators.required],
      typeFormateur: ['', Validators.required],
      themeId: [, Validators.required], // Changed to single themeId
    });
    this.loadThemes()

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getFormateur(id);
    }
  }

  getFormateur(id: string): void {
    this.formateurService.getFormateurById(parseInt(id)).subscribe({
      next: (data) => {
        this.formModel.patchValue(data);
      },
      error: (e) => console.error(e)
    });
  }
  loadThemes(): void {
    this.themeService.getThemes().subscribe((data: any[]) => {
      this.themes = data;
    });
  }


  get f() { return this.formModel.controls; }

  ModifierFormateur(): void {
    this.submitted = true;

    if (this.formModel.invalid) {
      return;
    }

    const id = this.route.snapshot.params["id"]
    if (id) {
      // Converting the form values to JSON before sending
      const formateurData = this.formModel.value;
      this.formModel.value.montant = parseInt(this.formModel.value.montant)
      console.log(formateurData)
      this.formateurService.ModifierFormateur(id, formateurData).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Formateur modifié avec succès',
            showConfirmButton: false,
            timer: 1500
          });

          this.router.navigate(['/list-Formateur']);
        },
        error: (e) => {
          console.error(e);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erreur lors de la modification du formateur!',
          });
        }
      });
    }
  }
}  