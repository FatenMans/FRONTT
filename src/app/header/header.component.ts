import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../_services/participant.service';
import { DemandeService } from '../_services/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  participantEmail!: number;
  role: any;

  constructor(private participantService: ParticipantService,
    private demandeService: DemandeService,
    private renderer: Renderer2,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.getRole()
  }
  @ViewChild('uploadModal') uploadModal!: ElementRef;
  //nekho Model el lkol
  selectedFile: File | null = null;



  becomeInternalTrainer(): void {

   
    if (this.selectedFile) {
      const user = JSON.parse(localStorage.getItem('user')!);
      console.log(user)
      const participant = { nom: user?.userName };
       // Replace with the actual name or retrieve it dynamically
      this.participantService.AddFileToPart(participant.nom, this.selectedFile).subscribe(
        response => {
          console.log('Participant updated successfully', response);
          this.closeModal();

        },
        error => {
          console.error('Error updating participant', error);
        }
      );
    } else {
      console.error('No file selected');
    }
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
  getRole() {
    this.role = JSON.parse(localStorage.getItem("roles")!)
    console.log(this.role)

  }
  closeModal(): void {
    this.renderer.removeClass(this.uploadModal.nativeElement, 'show');
    this.renderer.setAttribute(this.uploadModal.nativeElement, 'aria-hidden', 'true');
    this.renderer.setStyle(this.uploadModal.nativeElement, 'display', 'none');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop')?.remove();
  }
//ki nenzel aal buton nsaker el interface Modal
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}
}
