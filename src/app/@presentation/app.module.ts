/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { CoreModule } from '../@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { BasicAuthInterceptor, ErrorInterceptor, fakeBackendProvider } from '../@data/interceptors';
import { WINDOW_PROVIDERS } from "../@data/services/windows.providers";
import { EventEmmitGeneric } from "./common-components/viewservices/event.emmiter.service";
import { DomainModule } from "../@domain/domain.module";
import { Const } from '../@data/services/const';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    DomainModule.forRoot(),
    // CoreModule.forRoot(),

  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: PreloadFactory, deps: [Const], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    EventEmmitGeneric,
    // provider used to create fake backend
    WINDOW_PROVIDERS,
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function PreloadFactory(c: Const) {
  return () => c.initialize();
}