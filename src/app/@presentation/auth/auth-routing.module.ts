import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {AuthBaseComponent} from './auth-base/auth-base.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CodeAuthComponent} from './code-auth/code-auth.component';
import {RestorePasswordComponent} from './restore-password/restore-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '',
      component: AuthBaseComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: 'code-auth',
      component: CodeAuthComponent,
    },
    {
      path: 'restore-password',
      component: RestorePasswordComponent,
    },
    {
      path: 'change-password/:id-change-pass',
      component: ChangePasswordComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
