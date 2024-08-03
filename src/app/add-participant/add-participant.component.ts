import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../_services/participant.service';
import { LieuhebService } from '../_services/lieuheb.service';
import Swal from 'sweetalert2';
import { FormationService } from '../_services/formation.service';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {
  submitted = false;
  lieuheb: any[] = [];
  participant: any; // Define participant variable
  formationId: any;
  participantId: any;
  route: any;

  constructor(
    private router: Router,
    private participantService: ParticipantService,
    private formationService: FormationService,
    private formBuilder: FormBuilder,
    private lieuhebService: LieuhebService,
  ) { }

  formModel = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],

    lieutravail: ['', Validators.required],
    email: ['', Validators.required],
    datNais: ['', Validators.required],
    Affectation: ['', Validators.required],
    codGrad: ['', Validators.required],
    datEmb: ['', Validators.required],
    fonction: ['', Validators.required],
    sexe: ['', Validators.required],

    lieuHebergementId: [null, Validators.required],
    confirmation: ['', Validators.required],
    agePers: ['', Validators.required],
    matricule: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getLieux();


  }
  addParticipant(): void {
    this.formationService.addParticipantToFormation(this.formationId, this.participantId)
      .subscribe(response => {
        console.log('Participant ajouté avec succès:', response);
      }, error => {
        console.error('Erreur lors de l\'ajout du participant:', error);
      });
  }


  getLieux() {
    this.lieuhebService.getLieu().subscribe((data: any[]) => {
      console.log('Lieux data:', data); // Log data here
      this.lieuheb = data;
    }, error => {
      console.error('Error fetching lieux:', error);
    });
  }


  get f() { return this.formModel.controls; }

  ajouterParticipant() {
    this.submitted = true;
    console.log(this.formModel.value)

    if (this.formModel.invalid) {
      return;

    }

    this.participant = this.formModel.value;

    this.participantService.createParticipant(this.participant, this.formModel.value.lieuHebergementId!).subscribe(
      res => {

        console.log('faten1')
        Swal.fire({
          icon: 'success',
          title: 'participant ajoutée avec succès',
          showConfirmButton: true,
        });
        this.router.navigate(['/login']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Erreur lors de l'ajout de la participant",
          showConfirmButton: true,
        });
      }
    );
  }

}