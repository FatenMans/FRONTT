import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ListFormationsComponent } from './list-formation/list-formation.component';
import { ListFormateursComponent } from './list-formateur/list-formateur.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { AddFormateurComponent } from './add-formateur/add-formateur.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-Formation', component: ListFormationsComponent },
  { path: 'list-Formateur', component: ListFormateursComponent },
  { path: 'add-formation', component: AddFormationComponent },
  { path: 'add-formateur', component: AddFormateurComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
