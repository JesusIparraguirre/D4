import { NgModule } from '@angular/core';
import { NbContextMenuModule, NbLayoutModule, NbMenuModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HomeModule } from './home/home.module';
import { FrequentQuestionsModule } from './frequent-questions/frequent-questions.module';
import { ProfileModule } from "./profile/profile.module";
import { EventEmmitGeneric } from "../common-components/viewservices/event.emmiter.service";
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
// import { MesaServicioComponent } from '../common-components/mesa-servicio/mesa-servicio.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    CommonComponentsModule,
    HomeModule,
    DashboardModule,
    FrequentQuestionsModule,
    NbContextMenuModule,
    NbUserModule,
    ProfileModule,
    DynamicDialogModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [EventEmmitGeneric],
  entryComponents: [
    // MesaServicioComponent
  ]
})
export class PagesModule {
}
