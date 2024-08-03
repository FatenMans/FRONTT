import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CabinetFormationService } from 'src/app/_services/cabinet-formation.service';
import { LieuService } from 'src/app/_services/lieu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cabinet',
  templateUrl: './edit-cabinet.component.html',
  styleUrls: ['./edit-cabinet.component.css']
})
export class EditCabinetComponent implements OnInit {
  FormModel: FormGroup;
  lieux: any[] = [];
  currentCabinet: any;

  constructor(
    private formBuilder: FormBuilder,
    private cabinetFormationService: CabinetFormationService,
    private lieuService: LieuService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.FormModel = this.formBuilder.group({
      adress: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      idLieu: [null, Validators.required],
      createdBy: ['', Validators.required] ,// Added createdBy field

    });
  }

  ngOnInit(): void {
    this.loadLieux();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCabinetById(parseInt(id, 10));
    }
  }

  getCabinetById(id: number) {
    this.cabinetFormationService.getCabinetFormationById(id).subscribe({
      next: (data: any) => {
        this.FormModel.patchValue({
          //Utilise patchValue pour remplir le formulaire avec les données récupérées.
          ...data,
          idLieu: data.lieu ? data.lieu.id : null,
          createdBy: data.createdBy // 
        });
        console.log(this.FormModel.value);
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  loadLieux(): void {
    this.lieuService.getAllLieux().subscribe({
      next: (data: any[]) => {
        this.lieux = data;
      },
      error: (e: any) => console.error(e)
    });
  }

  ModifierCabinet(): void {
    if (this.FormModel.valid) {
      const updatedCabinet = {
        ...this.FormModel.value,
        lastModifiedDate: new Date().toISOString() // Assurez-vous que lastModifiedAt est inclus ici
      };
  
    if (this.FormModel.valid) {
      const updatedCabinet = this.FormModel.value;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.cabinetFormationService.updateCabinetFormation(parseInt(id, 10), updatedCabinet).subscribe({
          next: (res) => {
          
            Swal.fire({
              icon: 'success',
              title: 'Cabinet modifié avec succès',
              showConfirmButton: true,
            });
            this.router.navigate(['/list-cabinet']);
          },
          error: (e: any) => console.error(e)
        });
      }
    }
  }
}
}