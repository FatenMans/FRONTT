import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from '../_services/formation.service';


@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationsComponent implements OnInit {
  formations: any[] = [];

  constructor(private formationService: FormationService, private router: Router) { }

  ngOnInit(): void {
    this.getFormations();
  }

  private getFormations() {
    this.formationService.getFormation().subscribe(
      data => {
        console.log('Formations fetched from backend:', data);
        this.formations = data;
      },

    );
  }


}
