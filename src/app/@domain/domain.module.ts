import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppsRepository} from "./repository/apps.repository";
import {AppsService, AuthenticationService, UserService} from "../@data/services";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {AuthenticationRepository} from "./repository/authentication.repository";
import {UserRepository} from "./repository/user.respository";

const DATA_SERVICES = [
  { provide: AppsRepository, useClass: AppsService },
  { provide: AuthenticationRepository, useClass: AuthenticationService },
  { provide: UserRepository, useClass: UserService },
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class DomainModule {
  constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DomainModule,
      providers: [
        ...DATA_SERVICES,
      ],
    };
  }
}
