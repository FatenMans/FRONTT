import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AdminComponent } from './admin/admin.component';
import { ListParticipantComponent } from './participant/list-participant.component';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LieuComponent } from './lieu/lieu.component';
import { AgencyComponent } from './agency/agency.component';
import { ListFormateursComponent } from './formateurs/list-formateur/list-formateur.component';
import { AddFormateurComponent } from './formateurs/add-formateur/add-formateur.component';
import { ListFormationsComponent } from './formations/list-formation/list-formation.component';
import { AddLieuComponent } from './add-lieu/add-lieu.component';
import { LieuHebergementComponent } from './LieuHebergement/lieu-hebergement/lieu-hebergement.component';
import { AddLieuHebergementComponent } from './LieuHebergement/add-lieu-hebergement/add-lieu-hebergement.component';
import { ListThemeComponent } from './theme/list-theme/list-theme.component';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { AddCabinetComponent } from './cabinetformation/add-cabinet/add-cabinet.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { EditLieuComponent } from './edit-lieu/edit-lieu.component';
import { EditParticipantComponent } from './edit-participant/edit-participant.component';
import { CommonModule } from '@angular/common';
import { ListCabinetComponent } from './cabinetformation/list-cabinet/list-cabinet.component';
import { EditFormationComponent } from './formations/edit-formation/edit-formation.component';
import { EditFormateurComponent } from './formateurs/edit-formateur/edit-formateur.component';
import { RegisterComponent } from './register/register.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddFormationComponent } from './formations/add-formation/add-formation.component';
import { EditThemeComponent } from './theme/edit-theme/edit-theme.component';
import { EditCabinetComponent } from './cabinetformation/edit-cabinet/edit-cabinet.component';
import { ListActionformationComponent } from './PlanFormation/list-actionformation/list-actionformation.component';
import { AddActionFormationComponent } from './PlanFormation/add-actionformation/add-actionformation.component';
import { EvalComponent } from './eval/eval.component';
import { DemandeComponent } from './demande/demande.component';
import { ListDemandeComponent } from './list-demande/list-demande.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    AdminComponent,
    LieuComponent,
    ListParticipantComponent,
    AgencyComponent,
    ListFormateursComponent,
    AddFormateurComponent,
    ListFormationsComponent,
    AddFormationComponent,
    AddLieuComponent,
    LieuHebergementComponent,
    AddLieuHebergementComponent,
    ListThemeComponent,
    AddThemeComponent,
    AddCabinetComponent,
    AddParticipantComponent,
    EditLieuComponent,
    EditParticipantComponent,

    ListCabinetComponent,
    EditFormationComponent,
    EditFormateurComponent,
    EditLieuComponent,
    RegisterComponent,
    CalendarComponent,
    EditThemeComponent,
    EditCabinetComponent,
    ListActionformationComponent,
    AddActionFormationComponent,
    EvalComponent,
DemandeComponent,
ListDemandeComponent    
    
   
    
   










  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FullCalendarModule,



  ],
  providers: [
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
