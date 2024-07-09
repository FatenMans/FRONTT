import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabinetFormationService } from 'src/app/_services/cabinet-formation.service';
import { CabinetFormation } from 'src/app/models/CabinetFormation.model';

@Component({
  selector: 'app-list-cabinet',
  templateUrl: './list-cabinet.component.html',
  styleUrls: ['./list-cabinet.component.css']
})
export class ListCabinetComponent implements OnInit {
  openModal(_t37: any) {
    throw new Error('Method not implemented.');
  }
  cabinetFormations: any[] = [];


  constructor(private cabinetFormationService: CabinetFormationService, private router: Router) { }

  ngOnInit(): void {
    this.getCabinetFormation();
  }

  private getCabinetFormation() {
    this.cabinetFormationService.getCabinetFormation().subscribe(
      data => {
        console.log('Cabinet fetched from backend:', data);
        this.cabinetFormations = data;
      },
      error => {
        console.error('Error fetching cabinet formations', error);
      }
    );
  }
  deleteCabinetFormation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) {
      this.cabinetFormationService.deleteCabinetFormation(id).subscribe(
        response => {
          console.log('CabinetFormation deleted:', response);
          this.getCabinetFormation(); // Refresh the list after deletion
        },
        error => {
          console.error('Error deleting theme', error);
        }
      );
    }
  }
  updateCabinetFormation(id: number) {
    alert('Update CabinetFormation with ID: ' + id); // Simple alert instead of navigating to another route
  }
}