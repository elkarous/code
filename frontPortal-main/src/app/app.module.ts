import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PasswordComponent} from './Authentification/password/password.component';
import {JwtInterceptorService} from './Authentification/jwt-interceptor.service';
import {AuthGuard} from './Authentification/guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {ResetPasswordComponent} from './Authentification/reset-password/reset-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {ToastrModule} from 'ngx-toastr';
import {PageAdminComponent} from './page-admin/page-admin.component';
import {MatMenuModule} from '@angular/material/menu';


import {ListEmployeeComponent} from './gestion-des-patients/list-employee.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {UpdateEmployeeComponent} from './gestion-des-patients/updateemployee/update-employee.component';
import {AddEmployeetComponent} from './gestion-des-patients/addemployee/add-employeet.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';

import {AcceuilComponent} from './acceuil/acceuil.component';
import {CalenderComponent} from './calender/calender.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng';
import {NavbarComponent} from './navbar/navbar.component';
import { DahsbordComponent } from './dahsbord/dahsbord.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ListProjectComponent } from './list-project/list-project.component';
import { AddProjectComponent } from './list-project/add-project/add-project.component';
import { UpdateProjectComponent } from './list-project/update-project/update-project.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { UpdateTeemComponent } from './list-team/update-teem/update-teem.component';
import { AddTeamComponent } from './list-team/add-team/add-team.component';
import { ListClientComponent } from './list-client/list-client.component';
import { AddClientComponent } from './list-client/add-client/add-client.component';
import { UpdateClientComponent } from './list-client/update-client/update-client.component';
import { ListTacheComponent } from './list-tache/list-tache.component';
import { AddTacheComponent } from './list-tache/add-tache/add-tache.component';
import { UpdateTacheComponent } from './list-tache/update-tache/update-tache.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    HomeComponent,
    ResetPasswordComponent,
    PageAdminComponent,
    ListEmployeeComponent,
    StatistiquesComponent,
    UpdateEmployeeComponent,
    AddEmployeetComponent,
    AcceuilComponent,
    CalenderComponent,
    NavbarComponent,
    DahsbordComponent,
    ListProjectComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    ListTeamComponent,
    UpdateTeemComponent,
    AddTeamComponent,
    ListClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    ListTacheComponent,
    AddTacheComponent,
    UpdateTacheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    FullCalendarModule,
    DialogModule,
    ButtonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
