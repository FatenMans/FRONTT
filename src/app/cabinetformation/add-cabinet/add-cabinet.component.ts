import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CabinetFormationService } from 'src/app/_services/cabinet-formation.service';
import { LieuService } from 'src/app/_services/lieu.service';
import { CabinetFormation } from 'src/app/models/CabinetFormation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cabinet',
  templateUrl: './add-cabinet.component.html',
  styleUrls: ['./add-cabinet.component.css']
})
export class AddCabinetComponent implements OnInit {
  submitted = false;
  lieux: any[] = [];
  cabinetFormation: any; // Define cabinetFormation variable


  constructor(
    private router: Router,
    private cabinetFormationService: CabinetFormationService,
    private formBuilder: FormBuilder,
    private lieuService: LieuService,
  ) { }

  formModel = this.formBuilder.group({
    nomCabinet: ['', Validators.required],
    contact: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', Validators.required],
    idLieu: [null, Validators.required],
  });
  ngOnInit(): void {
    this.getAllLieux();
    
  }
  getAllLieux() {
    this.lieuService.getAllLieux().subscribe((data: any[]) => {
      console.log('Lieux data:', data); // Log data here
      this.lieux = data;
    }, error => {
      console.error('Error fetching lieux:', error);
    });
  }
  
 

  get f() { return this.formModel.controls; }
  

 
  ajouterCabinetFormation() {
    this.submitted = true;

    if (this.formModel.invalid) {
      return;
    }

    this.cabinetFormation = this.formModel.value;

    this.cabinetFormationService.createCabinetFormation(this.cabinetFormation, this.formModel.value.idLieu!).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'cabinet ajoutée avec succès',
          showConfirmButton: true,
        });
        this.router.navigate(['/list-cabinet']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Erreur lors de l'ajout de la cabinet",
          showConfirmButton: true,
        });
      }
    );
  }

}