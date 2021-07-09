import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderAuthComponent } from './header-auth/header-auth.component';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { NbSecurityModule } from '@nebular/security';
import { FooterAuthComponent } from './footer-auth/footer-auth.component';
import { CardAppComponent } from './card-app/card-app.component';
import { FilterAppsPipe } from './pipes/filter-apps.pipe';
import { AppEmptyComponent } from './app-empty/app-empty.component';
import { ItemListAppComponent } from './item-list-app/item-list-app.component';
import { RouterModule } from "@angular/router";
import { UppercaseDirectiveDirective } from "./directives/uppercase-directive.directive";
import { TrimFormDirective } from './directives/trim-form.directive';
import { BaseLogoComponent } from './base-logo/base-logo.component';
import { DialogGenericComponent } from './dialog-generic/dialog-generic.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AcordingViewComponent } from './acording-view/acording-view.component';
import { CodeItemComponent } from './code-item/code-item.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppLoaderModule } from "../app-loader/app-loader.module";
import { SecureImgPipe } from "./pipes/secure-img.pipe";
import { CheckboxModule } from 'primeng-lts/checkbox';
import { MesaServicioComponent } from './mesa-servicio/mesa-servicio.component';

const COMPONENTS = [
  FooterComponent,
  HeaderAuthComponent,
  ShowcaseDialogComponent,
  HeaderHomeComponent,
  FooterAuthComponent,
  CardAppComponent,
  FilterAppsPipe,
  AppEmptyComponent,
  ItemListAppComponent,
  UppercaseDirectiveDirective,
  BaseLogoComponent,
  DialogGenericComponent,
  ViewUserComponent,
  AcordingViewComponent,
  CodeItemComponent,
  SecureImgPipe,
  MesaServicioComponent,
  TrimFormDirective
];

@NgModule({
  declarations: [...COMPONENTS, SecureImgPipe],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbMenuModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbSecurityModule,
    RouterModule,
    NbLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AppLoaderModule,
    NbSpinnerModule,
    CheckboxModule,
    NbTooltipModule
  ],
  exports: [CommonModule,
    ...COMPONENTS],
  entryComponents: [
    ShowcaseDialogComponent,
    DialogGenericComponent,
    MesaServicioComponent
  ],
})
export class CommonComponentsModule {

  static titleAppsStart: string = "Aplicaciones destacadas";
  static titleAppsMoreToUse: string = "Aplicaciones que más usas";
  static titleAppsAll: string = "Todas las aplicaciones";
  static titleAppsFuture: string = "Próximos lanzamientos";
  static emptyAppPin: string = "assets/images/pin-empty.svg";
  static emptyAppTitle: string = "¡Aún no tienes aplicaciones destacadas!";
  static emptyAppSubTitle: string = "Para empezar a destacar aplicaciones da click en el ícono de pin.";
}
