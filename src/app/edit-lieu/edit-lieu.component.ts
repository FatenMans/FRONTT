import { Component, OnInit } from '@angular/core';
import { Lieu } from '../models/lieu.model';
import { Router } from '@angular/router';
import { LieuService } from '../_services/lieu.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-lieu',
  templateUrl: './edit-lieu.component.html',
  styleUrls: ['./edit-lieu.component.css']
})
export class EditLieuComponent implements OnInit {
  lieu: Lieu = { id: 0, lieu: '', formations: [] }; // Initialiser correctement l'objet lieu
  Lieu: any[] = [];
  // Add a list of formateurs
  submitted = false
  constructor(private router: Router, private lieuService: LieuService, private formbuilder: FormBuilder) { }
  formModel = this.formbuilder.group(
    {
      lieu: ['', Validators.required],


    }
  )

  get f() { return this.formModel.controls; }




  ngOnInit(): void {
  }
  getLieuById(id: number) {
    this.lieuService.getLieuById(id).subscribe({
      next: (data: any) => {
        this.formModel.patchValue(data);
        console.log(data)
      },
      error: (e: any) => console.error(e)
    });
  }
  ModifierLieu(): void {
    if (this.formModel.valid) {
      const updatedFormation = this.formModel.value;
      const id = this.router.routerState.snapshot.url;
      if (id) {
        this.lieuService.ModifierLieu(parseInt(id), this.ModifierLieu).subscribe({
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


