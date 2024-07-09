import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipantService } from '../_services/participant.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {
  participantForm: FormGroup;

  constructor(private fb: FormBuilder, private participantService: ParticipantService,
    private router: Router
  ) {
    this.participantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      type: ['', Validators.required],
      lieutravail: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      datNais: ['', Validators.required],
      Affectation: ['', Validators.required],
      codGrad: ['', Validators.required],
      datEmb: ['', Validators.required],
      fonction: ['', Validators.required],
      sexe: ['', Validators.required],
      hebergementNuite: ['', Validators.required],
      confirmation: ['', Validators.required],
      agePers: ['', Validators.required],
      matricule: ['', Validators.required]
      // Ajoutez d'autres champs ici si nécessaire
    });
  }

  ngOnInit(): void { }

  ajouterParticipant() {
    console.log(this.participantForm.value)
    if (this.participantForm.valid) {
      this.participantService.createParticipant(this.participantForm.value).subscribe(
        response => {
          console.log('Participant ajouté avec succès', response);
          // Rediriger ou afficher un message de succès

          Swal.fire({
            icon: 'success',
            title: 'Formateur ajouté avec succès',
            showConfirmButton: true,
    
          });
          this.router.navigate(['/list-participant']);
        },
        error => {
          console.error('Erreur lors de l\'ajout du participant', error);
        }
      );
    }
  }
}
