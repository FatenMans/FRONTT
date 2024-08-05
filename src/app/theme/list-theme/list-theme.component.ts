import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.css']
})
export class ListThemeComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.getThemes();
  }

  private getThemes() {
    this.themeService.getThemes().subscribe(
      data => {
        this.themes = data;
      },
      err => {
        console.error('Error fetching themes', err);
      }
    );
  }

  deleteTheme(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce thème?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.themeService.deleteTheme(id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Theme supprimée avec succès',
              showConfirmButton: true
            });
            this.getThemes();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: "Erreur lors de la suppression du thème",
              showConfirmButton: true
            });
          }
        );
      }
    });
  }

  updateTheme(id: number) {
    this.router.navigate(['/edit-theme', id]);
  }
}
