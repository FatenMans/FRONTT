import { Component, OnInit } from '@angular/core';
import { Lieu } from '../models/lieu.model';
import { Router, ActivatedRoute } from '@angular/router';
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
  Lieu: Lieu[] = []; // Changer de any[] à Lieu[]
  submitted = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, // Utiliser ActivatedRoute pour accéder à snapshot
    private lieuService: LieuService,
    private formbuilder: FormBuilder
  ) {}

  formModel = this.formbuilder.group({
    id: [0], // Ajouter l'id ici
    lieu: ['', Validators.required],
  });

  get f() { return this.formModel.controls; }

  ngOnInit(): void {
    this.loadLieux();
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Utiliser activatedRoute ici
    if (id) {
      this.getLieuById(parseInt(id, 10));
    }
  }

  getLieuById(id: number) {
    this.lieuService.getLieuById(id).subscribe({
      next: (data: any) => {
        this.formModel.patchValue(data); // Utiliser directement data
        console.log(this.formModel.value);
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  loadLieux(): void {
    this.lieuService.getAllLieux().subscribe({
      next: (data: Lieu[]) => { // Changer any[] à Lieu[]
        this.Lieu = data;
      },
      error: (e: any) => console.error(e)
    });
  }

  ModifierLieu(): void {

    if (this.formModel.valid) {
      const updatedLieu= {
        ...this.formModel.value,
        lastModifiedDate: new Date().toISOString() // Assurez-vous que lastModifiedAt est inclus ici
      };
  
    this.submitted = true;
    if (this.formModel.valid) {
      const updatedLieu = this.formModel.value as Lieu; // Cast à Lieu
      const id = this.activatedRoute.snapshot.paramMap.get('id'); // Utiliser activatedRoute ici
      if (id) {
        this.lieuService.ModifierLieu(parseInt(id, 10), updatedLieu).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Lieu modifié avec succès',
              showConfirmButton: true,
            });
            this.router.navigate(['/lieu']);
          },
          error: (e) => console.error(e)
        });
      }
    }
  }
}
}