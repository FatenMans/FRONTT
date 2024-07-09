import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CabinetFormationService } from 'src/app/_services/cabinet-formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cabinet',
  templateUrl: './add-cabinet.component.html',
  styleUrls: ['./add-cabinet.component.css']
})
export class AddCabinetComponent implements OnInit {
  submitted = false;

  constructor(
    private router: Router,
    private cabinetFormationService: CabinetFormationService,
    private formBuilder: FormBuilder
  ) { }

  formModel = this.formBuilder.group({
    adress: ['', Validators.required],
    contact: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', Validators.required]
  });

  ngOnInit(): void { }

  get f() { return this.formModel.controls; }

  ajouterCabinetFormation() {
    this.submitted = true;
    if (this.formModel.invalid) {
      return;
    }

    this.cabinetFormationService.createCabinetFomration(this.formModel.value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'CabinetFormation ajouté avec succès',
          showConfirmButton: true
        });
        this.router.navigate(['/cabinetformation']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de l\'ajout du CabinetFormation!',
          showConfirmButton: true
        });
      }
    );
  }
}

