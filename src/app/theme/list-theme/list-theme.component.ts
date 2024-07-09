import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/_services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.css']
})
export class ListThemeComponent implements OnInit {
  themes: Theme[] = [];
  router: any;

  constructor(private themeService: ThemeService) { }

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
  editTheme(id: number) {
    this.router.navigate([`/edit-theme/${id}`]);
  }

  deleteTheme(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) {
      this.themeService.deleteTheme(id).subscribe(
        response => {
          console.log('Theme deleted:', response);
          this.getThemes(); // Refresh the list after deletion
        },
        error => {
          console.error('Error deleting theme', error);
        }
      );
    }
  }


}
