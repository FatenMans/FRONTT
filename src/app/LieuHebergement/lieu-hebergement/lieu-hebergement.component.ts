import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LieuService } from 'src/app/_services/lieu.service';
import { LieuhebService } from 'src/app/_services/lieuheb.service';
import { Lieuheb } from 'src/app/models/lieuheb.model';

@Component({
  selector: 'app-lieu-hebergement',
  templateUrl: './lieu-hebergement.component.html',
  styleUrls: ['./lieu-hebergement.component.css']
})
export class LieuHebergementComponent implements OnInit {
  lieux: Lieuheb[] = [];
  lieu: any;

  constructor(private lieuhebService: LieuhebService, private router: Router) { }

  ngOnInit(): void {
    this.getLieux();
  }

  private getLieux() {
    this.lieuhebService.getLieu().subscribe(
      data => {
        console.log('Lieux fetched from backend:', data);
        this.lieux = data; // Mise à jour de this.lieux
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  deleteLieuheb(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) {
      this.lieuhebService.deleteLieuheb(id).subscribe(
        response => {
          console.log('lieuheb deleted:', response);
          this.getLieux(); // Refresh the list after deletion
        },
        error => {
          console.error('Error deleting theme', error);
        }
      );
    }
  }
}
