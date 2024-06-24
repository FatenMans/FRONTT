import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from '../_services/formateur.service';

@Component({
  selector: 'app-list-formateurs',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.css']
})
export class ListFormateursComponent implements OnInit {
  formateurs: any[] = [];

  constructor(private formateurService: FormateurService, private router: Router) { }

  ngOnInit(): void {
    this.getFormateurs();
  }

  private getFormateurs() {
    this.formateurService.getFormateurs().subscribe(
      data => {
        console.log(data)
        console.log('Formateurs fetched from backend:', data);
        this.formateurs = data;
      },

    );
  }


}
