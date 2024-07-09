import { Component, OnInit } from '@angular/core';
import { LieuService } from '../_services/lieu.service';
import { Lieu } from '../models/lieu.model';
import { Router } from '@angular/router';

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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) {
      this.lieuService.deleteLieu(id).subscribe(
        response => {
          console.log('Lieu deleted:', response);
          this.getLieux(); // Refresh the list after deletion
        },
        error => {
          console.error('Error deleting theme', error);
        }
      );
    }
  }
  updateLieu(id: number) {
    alert('Update Lieu with ID: ' + id); // Simple alert instead of navigating to another route
  }
}
