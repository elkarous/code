import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {HomeComponent} from './home/home.component';
import {ResetPasswordComponent} from './Authentification/reset-password/reset-password.component';
import {CalenderComponent} from './calender/calender.component';
import {DahsbordComponent} from './dahsbord/dahsbord.component';
import {ListClientComponent} from './list-client/list-client.component';
import {ListProjectComponent} from './list-project/list-project.component';
import {ListTeamComponent} from './list-team/list-team.component';
import {AuthGuard} from "./Authentification/guards/auth.guard";
import {ListTacheComponent} from "./list-tache/list-tache.component";
import {ReportingComponent} from "./reporting/reporting.component";
import {AuthGuardIn} from "./Authentification/guards/authInv.guard";

const routes: Routes = [
  {path: '', component: HomeComponent,canActivate:[AuthGuardIn]},
  {path: 'resetPassword/:token', component: ResetPasswordComponent,canActivate:[AuthGuardIn]},
  {
    path: 'dashboard', component: DahsbordComponent, children: [
      {path: 'calender', component: CalenderComponent},
      {path: 'reporting/:id', component: ReportingComponent},
      {path: 'client', component: ListClientComponent},
      {path: 'project', component: ListProjectComponent},
      {path: 'team', component: ListTeamComponent},
      {path: 'employee', component: ListEmployeeComponent},
      {path: 'tache', component: ListTacheComponent},
    ],canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
