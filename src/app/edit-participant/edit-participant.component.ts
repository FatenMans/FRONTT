import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'src/app/_services/participant.service';
import { Participant } from 'src/app/models/participant.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {
  formModel!: FormGroup;
  participant: Participant = new Participant();
  submitted = false;
lieuheb: any
  constructor(
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formModel = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      lieutravail: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      datNais: ['', Validators.required],
      Affectation: ['', Validators.required],
      codGrad: ['', Validators.required],
      datEmb: ['', Validators.required],
      fonction: ['', Validators.required],
      salaire: ['', Validators.required],
      sexe: ['', Validators.required],
      hebergementNuite: [false],
      confirmation: [false],
      agePers: ['', Validators.required],
      matricule: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getParticipant(id);
    }
  }

  getParticipant(id: string): void {
    this.participantService.getParticipantById(parseInt(id)).subscribe({
      next: (data) => {
        this.formModel.patchValue(data);
      },
      error: (e) => console.error(e)
    });
  }

  get f() { return this.formModel.controls; }

  ModifierParticipant(): void {
    if (this.formModel.valid) {
      const modifiedParticipant = {
        ...this.formModel.value,
        lastModifiedDate: new Date().toISOString()
      };

      const id = this.route.snapshot.paramMap.get('id');
      const lieuHebergementId = 1; // Remplacez ceci par la valeur réelle
      const userId = 'current-user-id'; // Remplacez ceci par la valeur réelle

      if (id) {
        this.participantService.updateParticipant(parseInt(id), modifiedParticipant, lieuHebergementId, userId).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Participant modifié avec succès',
              showConfirmButton: false,
              timer: 1000
            });

            this.router.navigate(['/list-Participant']);
          },
          error: (err) => {
            console.error('Erreur lors de la modification du participant', err);
            let errorMessage = 'Une erreur est survenue lors de la modification du participant';
            if (err && err.error && err.error.message) {
              errorMessage = err.error.message;
            }
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: errorMessage,
              showConfirmButton: true,
            });
          }
        });
      }
    }
  }
}
