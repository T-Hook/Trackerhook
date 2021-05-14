import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { AuthenticationComponent } from './authentication/authentication.component';
import { StarterComponent } from './starter/starter.component';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TasksComponent } from "./tasks/tasks.component";
import { SprintsComponent } from "./sprints/sprints.component";
import { TrackingComponent } from "./trackings/trackings.component";
import { ShowTrackingComponent } from "./trackings/show/showtrackings.component";
import { ProfileComponent } from './profile/profile.component';
import { MailComponent } from './mail/mail/mail.component';
import { MailsComponent } from './mails/mails/mails.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: HomeComponent
    },
    {
        path: 'authentication',
        component: AuthenticationComponent
    },
    {
        path: 'companies',
        component: CompaniesComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'sprints',
        component: SprintsComponent
    },
    {
        path: 'tracking',
        component: TrackingComponent
    },
    {
        path: 'tracking/:id',
        component: ShowTrackingComponent
    },
    {
        path: 'starter',
        component: StarterComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
  },
  {
    path: 'mail/:id',
    component: MailComponent
},
    {
  path: 'mails',
  component: MailsComponent
},
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
