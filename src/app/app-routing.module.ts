import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListParticipantComponent } from './participant/list-participant.component';
import { LieuComponent } from './lieu/lieu.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { AgencyComponent } from './agency/agency.component';
import { AddFormateurComponent } from './formateurs/add-formateur/add-formateur.component';
import { ListFormateursComponent } from './formateurs/list-formateur/list-formateur.component';
import { ListFormationsComponent } from './formations/list-formation/list-formation.component';
import { AddFormationComponent } from './formations/add-formation/add-formation.component';
import { AddLieuComponent } from './add-lieu/add-lieu.component';
import { LieuHebergementComponent } from './LieuHebergement/lieu-hebergement/lieu-hebergement.component';
import { AddLieuHebergementComponent } from './LieuHebergement/add-lieu-hebergement/add-lieu-hebergement.component';
import { ListThemeComponent } from './theme/list-theme/list-theme.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { AddCabinetComponent } from './cabinetformation/add-cabinet/add-cabinet.component';
import { ListCabinetComponent } from './cabinetformation/list-cabinet/list-cabinet.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { EditFormationComponent } from './formations/edit-formation/edit-formation.component';
import { EditFormateurComponent } from './formateurs/edit-formateur/edit-formateur.component';
import { EditLieuComponent } from './edit-lieu/edit-lieu.component';
import { RegisterComponent } from './register/register.component';
import { ParticipantService } from './_services/participant.service';
import { CalendarComponent } from './calendar/calendar.component';
import { EditThemeComponent } from './theme/edit-theme/edit-theme.component';
import { EditCabinetComponent } from './cabinetformation/edit-cabinet/edit-cabinet.component';
import { ListActionformationComponent } from './PlanFormation/list-actionformation/list-actionformation.component';
import { AddActionFormationComponent } from './PlanFormation/add-actionformation/add-actionformation.component';
import { EvalComponent } from './eval/eval.component';
import { DemandeComponent } from './demande/demande.component';
import { ListDemandeComponent } from './list-demande/list-demande.component';
import { EnrolledFormationsComponent } from './enrolled-formations/enrolled-formations.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'list-Formateur', component: ListFormateursComponent },
  { path: 'add-Formateur', component: AddFormateurComponent },
  { path: 'side-bar', component: SideBarComponent },
  { path: 'list-participant', component: ListParticipantComponent },
  { path: 'add-participant', component: AddParticipantComponent },
  { path: 'edit-formation/:id', component: EditFormationComponent },
  { path: 'edit-formateur/:id', component: EditFormateurComponent },
  { path: 'edit-lieu/:id', component: EditLieuComponent },
  { path: 'calendar', component: CalendarComponent },
  
  { path: 'edit-theme/:id', component: EditThemeComponent },
  { path: 'edit-cabinet/:id', component: EditCabinetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'participant', component: ParticipantService, canActivate: [AuthGuard], data: { roles: ['PARTICIPANT'] } },
  { path: 'add-actionformation', component: AddActionFormationComponent },
  { path: 'eval', component: EvalComponent },
  { path: 'list-actionformation', component: ListActionformationComponent },
  { path: 'lieu', component: LieuComponent },
  { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'User', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'agency', component: AgencyComponent },
  { path: 'list-Formation', component: ListFormationsComponent },
  { path: 'add-Formation', component: AddFormationComponent },
  { path: 'add-lieu', component: AddLieuComponent },
  { path: 'lieuHebergement', component: LieuHebergementComponent },
  { path: 'add-lieu-hebergement', component: AddLieuHebergementComponent },
  { path: 'list-theme', component: ListThemeComponent },
  { path: 'add-theme', component: AddThemeComponent },
  { path: 'list-cabinet', component: ListCabinetComponent },
  { path: 'add-cabinet', component: AddCabinetComponent },
  { path: 'demande', component: DemandeComponent},
  { path: 'list-demande', component: ListDemandeComponent},
  { path: 'enrolled-formations', component: EnrolledFormationsComponent},

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
 
















];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
