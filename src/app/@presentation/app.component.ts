/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../@data/model/User';
import { Router } from '@angular/router';
import { AuthenticationRepository } from "../@domain/repository/authentication.repository";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationRepository,
  ) {
    this.obteneDetalleUser();
    this.currentUser = this.authenticationService.getCurrentUserValue;
  }
  private obteneDetalleUser() {
    this.currentUser = this.authenticationService.getCurrentUserValue;
  }
  logout() {
    this.authenticationService.logout(this.currentUser.id, true);
    this.router.navigate(['/auth/login']);
  }
  ngOnInit() {

  }
}
