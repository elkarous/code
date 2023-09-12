import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListEmployeeComponent} from './gestion-des-patients/list-employee.component';
import {HomeComponent} from './home/home.component';
import {PageAdminComponent} from './page-admin/page-admin.component';
import {RendezVousComponent} from './rendez-vous/rendez-vous.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ResetPasswordComponent} from './Authentification/reset-password/reset-password.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {CalenderComponent} from './calender/calender.component';
import {ListeRendezVousComponent} from './liste-rendez-vous/liste-rendez-vous.component';
import {DahsbordComponent} from './dahsbord/dahsbord.component';
import {ListClientComponent} from './list-client/list-client.component';
import {ListProjectComponent} from './list-project/list-project.component';
import {ListTeamComponent} from './list-team/list-team.component';

const routes: Routes = [
  {path: '', component: AcceuilComponent},
  {path: 'login', component: HomeComponent},
  {path: 'resetPassword/:token', component: ResetPasswordComponent},
  {
    path: 'dashboard', component: DahsbordComponent, children: [
      {path: 'calender', component: CalenderComponent},
      {path: 'client', component: ListClientComponent},
      {path: 'project', component: ListProjectComponent},
      {path: 'team', component: ListTeamComponent},
      {path: 'employee', component: ListEmployeeComponent},
      {path: 'statistiques', component: StatistiquesComponent},
    ]
  },
  {
    path: 'pageadmin', component: PageAdminComponent, children: [
      {path: 'Rendez-Vous', component: RendezVousComponent}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
