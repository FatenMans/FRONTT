import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../_services/participant.service';
import { DemandeService } from '../_services/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  participantEmail!: number;
  router: any;

  constructor(private participantService: ParticipantService,
    private demandeService: DemandeService
  ) { }

  becomeInternalTrainer(): void {
    this.demandeService.createDemande({ dateDemande: new Date() }).subscribe(res => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Demande envoyée avec succès',
        

      })
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Vous avez déja envoyé une demande',
        
      })
    })
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}
