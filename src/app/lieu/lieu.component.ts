import { Component, OnInit } from '@angular/core';
import { LieuService } from '../_services/lieu.service';
import { Lieu } from '../models/lieu.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.css']
})
export class LieuComponent implements OnInit {
  lieux: Lieu[] = [];

  constructor(private lieuService: LieuService, private router: Router) { }

  ngOnInit(): void {
    this.getLieux();
  }

  private getLieux() {
    this.lieuService.getLieu().subscribe(
      data => {
        console.log('Lieux fetched from backend:', data);
        this.lieux = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  deleteLieu(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette Lieu?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lieuService.deleteLieu(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Lieu supprimée avec succès',
              showConfirmButton: true,
            });
            this.getLieux();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression de la Lieu",
              showConfirmButton: true,
            });
          }
        );
      }
    });
  }

  updateLieu(id: number) {
    alert('Update Lieu with ID: ' + id); // Simple alert instead of navigating to another route
  }
}