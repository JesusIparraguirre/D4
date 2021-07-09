import {NgModule} from '@angular/core';
import {ThemeModule} from '../@theme/theme.module';
import {LoginModule} from './login/login.module';
import {AuthBaseModule} from './auth-base/auth-base.module';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {NbLayoutModule, NbMenuModule, NbSidebarModule} from '@nebular/theme';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {ForgotPasswordModule} from './forgot-password/forgot-password.module';
import {CodeAuthModule} from './code-auth/code-auth.module';
import {RestorePasswordModule} from './restore-password/restore-password.module';
import {ChangePasswordModule} from './change-password/change-password.module';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    RestorePasswordModule,
    ChangePasswordModule,
    CodeAuthModule,
    ForgotPasswordModule,
    LoginModule,
    AuthBaseModule,
    AuthRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    NbSidebarModule,
    CommonComponentsModule,
  ],
})
export class AuthModule { }
