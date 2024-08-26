import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateurService } from 'src/app/_services/formateur.service';
import { ThemeService } from 'src/app/_services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-formateurs',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.css']
})
export class ListFormateursComponent implements OnInit {
  formateurs: any[] = [];
  inputSearch: string = '';
  themes: any[] = []; // Update type if necessary
  selectedTheme: string = '';

  constructor(
    private formateurService: FormateurService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.loadThemes();
    this.loadFormateurs(); // Initialize with theme filtering if needed
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  loadFormateurs(theme?: string): void {

    this.formateurService.getFormateurs(theme).subscribe(
      data => {
        this.formateurs = data;
      },
      error => {
        console.error('Error fetching formateurs:', error);
        // Optionally show an error message to the user
      }
    );
  }


  onThemeChange(): void {
    this.loadFormateurs(this.selectedTheme);
  }
  onThemeSelect(event: Event): void {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    console.log(selectedTheme); // Perform your logic with the selected theme
    this.loadFormateurs(selectedTheme); // Call the service with the selected theme
  }


  searchFormateur(): void {
    if (this.inputSearch.trim() !== '') {
      this.formateurService.searchFormateur(this.inputSearch).subscribe(data => {
        this.formateurs = data;
      }, error => {
        console.error('Error fetching formateurs:', error);
      });
    } else {
      this.loadFormateurs(this.selectedTheme); // Reload with current theme filter
    }
  }

  deleteFormateur(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce formateur?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then(result => {
      if (result.isConfirmed) {
        this.formateurService.deleteFormateur(id).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Formateur supprimé avec succès',
            showConfirmButton: true,
          });
          this.loadFormateurs(); // Reload with current theme filter
        }, err => {
          Swal.fire({
            icon: 'error',
            title: "Erreur lors de la suppression du formateur",
            showConfirmButton: true,
          });
        });
      }
    });
  }
}
