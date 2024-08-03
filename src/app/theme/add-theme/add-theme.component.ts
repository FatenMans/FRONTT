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
  f: any;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private themeService: ThemeService,
    private router: Router
  ) {
    this.themeForm = this.fb.group({
      codeTheme: ['', Validators.required],
      theme: ['', Validators.required],
      typeThemeIntraInter: ['', Validators.required],
      accord: ['', Validators.required],
      documents: ['', Validators.required],
      
      // Add other fields here if necessary
    })

  }
  ngOnInit(): void {}
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
 
   
  ajouterTheme() {
    this.submitted = true;
    console.log(this.themeForm.value)
    if (this.themeForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('themeData', JSON.stringify(this.themeForm.value));
  
      console.log('FormData:', formData); // Vérifiez si formData est correctement rempli
 
      this.themeService.createThemeWithDocument(formData).subscribe(
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
    }
  }
}