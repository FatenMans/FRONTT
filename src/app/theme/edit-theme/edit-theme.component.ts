import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/_services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css']
})
export class EditThemeComponent implements OnInit {
  themeForm: FormGroup;
  currentTheme: any;

  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.themeForm = this.formBuilder.group({
      codeTheme: ['', Validators.required],
      theme: ['', Validators.required],
      typeThemeIntraInter: ['', Validators.required],
      accord: ['', Validators.required],
      documents: ['', Validators.required],
      // Add other fields here if necessary
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getThemeById(parseInt(id));
    }
  }

  getThemeById(id: number): void {
    this.themeService.getThemeById(id).subscribe({
      next: (data: any) => {
        this.themeForm.patchValue(data);
        this.currentTheme = data;
        createdBy: data.createdBy // 

      },
      error: (e: any) => console.error(e)
    });
  }

  modifierTheme(): void {
    if (this.themeForm.valid) {
      const updatedTheme = {
        ...this.themeForm.value,
        lastModifiedDate: new Date().toISOString() // Assurez-vous que lastModifiedAt est inclus ici
      };
    if (this.themeForm.valid) {
      const updatedTheme = this.themeForm.value;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.themeService.ModifierTheme(parseInt(id), updatedTheme).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Thème modifié avec succès',
              showConfirmButton: true,
            });
            this.router.navigate(['/list-theme']);
          },
          error: (e) => {
            console.error(e);
            // Gérer l'erreur ici, par exemple afficher une alerte d'erreur
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de la modification du thème',
              text: 'Une erreur est survenue, veuillez réessayer plus tard.',
              showConfirmButton: true,
            });
          }
        });
      }
    }
  }
  }
}
