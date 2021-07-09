import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, takeUntil} from "rxjs/operators";
import {NbMediaBreakpointsService, NbThemeService} from "@nebular/theme";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationRepository} from "../../@domain/repository/authentication.repository";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  response: boolean = false;

  constructor(
    private router: Router,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private authenticationService: AuthenticationRepository,
  ) {
  }

  validateUserLogin () {
    const currentUser = this.authenticationService.getCurrentUserValue;
    if (currentUser) {
      this.router.navigate(['/pages/']);
    }
  }

  ngOnInit() {
    this.validateUserLogin();
    this.callListenerSize();
  }
  private callListenerSize() {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.response = isLessThanXl;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
