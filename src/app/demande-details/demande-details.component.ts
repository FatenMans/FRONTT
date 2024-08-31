import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../_services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ParticipantService } from '../_services/participant.service';
import * as saveAs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {
  demandeId!: number;
  demande: any
  theme: any
  participant: any

  FormModel = this.formBuilder.group({
    dateDemande: [{ value: new Date(), disabled: true }, Validators.required],
    experience: [{ value: '', disabled: true }, Validators.required],
    competences: [{ value: '', disabled: true }, Validators.required],
    motivation: [{ value: '', disabled: true }, Validators.required],
    objectifs: [{ value: '', disabled: true }, Validators.required],
  });

  get f() { return this.FormModel.controls; }

  constructor(private demandeService: DemandeService, private router: ActivatedRoute,
    private formBuilder: FormBuilder, private particpantService: ParticipantService,
    private route: Router
  ) { }



  downloadFile(fileName: string): void {
    this.particpantService.downloadFile(fileName).subscribe(
      (blob: Blob) => {
        console.log('Blob:', blob);
        saveAs(blob, fileName);
      },
      error => {
        console.error('Erreur lors du téléchargement du fichier', error);
      }
    );
  }

  refuserDemande(): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir refuser cette demande?',
      text: "Cette action marquera la demande comme non validée!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, refuser!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.refuserDemande(this.demandeId).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Demande refusée avec succès',
            });
            this.route.navigate(['/list-demande']);
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors du refus de la demande',
              text: err.message
            });
          }
        );
      }
    });
  }

  acceptDemande() {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir accepter cette demande?',
      text: "Cette action ne peut pas être annulée!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, acceptez!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.acceptDemande(this.demande.id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Demande acceptée avec succès',
            });

          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de l\'acceptation de la demande',
            });
          }
        );
        this.convertToFormateur()
        this.route.navigate(['/list-demande']);

      }
    });
  }

  convertToFormateur(): void {
    console.log(this.participant.id)
    this.particpantService.convertParticipant(this.participant.id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Participant converti en Formateur avec succès',
          showConfirmButton: true,
        });
        // Reload the participant list
      },
      error => {
        console.error('Error converting participant:', error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Erreur lors de la conversion du participant',
        //   text: 'Veuillez réessayer plus tard.',
        // });
      }
    );
  }


  ngOnInit(): void {
    this.getDemande();
  }

  getDemande() {
    this.demandeId = this.router.snapshot.params['id'];
    this.demandeService.getDemande(this.demandeId).subscribe(
      data => {
        console.log(data)
        this.demande = data;
        this.participant = this.demande.participant

        this.FormModel.patchValue(this.demande);


        console.log(this.FormModel.value)
      },
      error => {
        console.log(error);
      }
    )
  }








}
