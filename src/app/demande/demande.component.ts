import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DemandeService } from 'src/app/_services/demande.service';
import { AuthService } from '../_auth/auth.service';
import { ParticipantService } from '../_services/participant.service';
import { Demande } from '../models/demande';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  submitted = false;
  participants: any[] = [];
  participantId: number | null = null; // To store the current participant ID

  FormModel = this.formBuilder.group({
    participantId: [null, Validators.required],
    dateDemande: [new Date().toISOString(), Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private demandeService: DemandeService,
    private authService: AuthService,
    private participantService: ParticipantService
  ) { }

  ngOnInit(): void {
    // Fetch participants if needed for dropdown
    this.getParticipants();

    // Automatically set the participantId to the current user ID
    // this.setCurrentParticipantId();
  }

  // Fetch participants for dropdown or any other purpose
  getParticipants() {
    this.participantService.getParticipants().subscribe(
      (data: any[]) => {
        this.participants = data;
      },
      error => {
        console.error('Error fetching participants:', error);
      }
    );
  }

  // Set the participantId for the logged-in user
  // setCurrentParticipantId() {
  //   this.authService.getCurrentUser().subscribe(user => {
  //     if (user) {
  //       this.participantId = user.id; // Assuming `user.id` is the ID of the participant
  //       this.FormModel.patchValue({
  //         participantId: this.participantId
  //       });
  //     }
  //   });
  // }

  get f() { return this.FormModel.controls; }

  ajouterDemande() {
    this.submitted = true;

    if (this.FormModel.invalid) {
      return;
    }

    const demande: any = this.FormModel.value;

    // this.demandeService.createDemande(demande).subscribe(
    //   (response: Demande) => {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Demande ajoutée avec succès',
    //       showConfirmButton: true,
    //     });
    //     this.router.navigate(['/list-demande']);
    //   },
    //   err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: "Erreur lors de l'ajout de la demande",
    //       showConfirmButton: true,
    //     });
    //     console.error('Erreur lors de l\'ajout de la demande:', err);
    //   }
    // );
  }
}
