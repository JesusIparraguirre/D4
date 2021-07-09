import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrequentQuestionsComponent } from './frequent-questions/frequent-questions.component';
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'frequent-questions',
      component: FrequentQuestionsComponent,
      data: { mant: false }
    },
    {
      path: 'mant-frequent-questions',
      component: FrequentQuestionsComponent,
      data: { mant: true }
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    /* {
      path: '',
      outlet: 'popup',
      component: MesaServicioComponent,
    }, */
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
