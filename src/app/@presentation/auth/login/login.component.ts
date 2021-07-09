import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbIconLibraries, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
import { DialogGenericComponent } from "../../common-components/dialog-generic/dialog-generic.component";
import { AuthenticationRepository } from "../../../@domain/repository/authentication.repository";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  showPass: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  showOnlyForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    iconsLibrary: NbIconLibraries,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private authenticationService: AuthenticationRepository,
  ) {
    if (this.authenticationService.getCurrentUserValue) {
      this.router.navigate(['/']);
    }
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      pass: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.callListenerSize();
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.user.value, this.f.pass.value)
      .subscribe(
        (data: any) => {
          this.router.navigate([this.returnUrl]);
        }, (error) => {
          this.loading = false;
          this.dialogService.open(DialogGenericComponent, {
            context: {
              title: error.titulo,
              body: error.mensaje,
              textButtom: error.codigo != 5054 ? 'Volver a intentar' : "Ir a cambiar contraseña",
              responseCode: error.codigo,
              responseValue: error.UrlRedireccion,
            },
            closeOnBackdropClick: false,
            autoFocus: false,
          }).onClose.subscribe((value: boolean) => { });
        });
  }

  // user

  firstChargeUser: boolean = true;
  userIsFocus: boolean = false;

  getUserErrorClass() {
    if (!this.firstChargeUser) {
      if (!this.userIsFocus) {
        return this.getErrorUser();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getErrorUser() {
    return !this.isUserEmpty() && this.f.user.errors !== null;
  }
  isUserEmpty() {
    return this.f.user.value.toString().length === 0;
  }
  getColorIcoUser() {
    if (this.isUserEmpty()) {
      if (this.userIsFocus) {
        return '#43b02a';
      } else {
        return '#E2E2E2';
      }
    } else {
      if (!this.getErrorUser()) {
        return '#43b02a';
      } else {
        return 'red';
      }
    }
  }

  focusInInputUser($event) {
    this.userIsFocus = true;
    this.firstChargeUser = false;
  }

  focusOutInputUser($event) {
    this.userIsFocus = false;
  }

  getColorLabelUser() {
    if (this.isUserEmpty()) {
      if (this.userIsFocus) {
        return '#003a70';
      } else {
        return '#9D9D9D';
      }
    } else {
      if (!this.getErrorUser()) {
        return '#003a70';
      } else {
        return 'red';
      }
    }
  }
  getColorBorderUser() {
    if (this.isUserEmpty()) {
      if (this.userIsFocus) {
        return '#003a70';
      } else {
        return '#e2e2e2';
      }
    } else {
      if (!this.getErrorUser()) {
        return '#003a70';
      } else {
        return 'red';
      }
    }
  }

  isVisibleErrorUser() {
    if (this.getErrorUser()) {
      return !this.firstChargeUser;
    } else {
      return false;
    }
  }

  // pass

  firstChargePass: boolean = true;
  passIsFocus: boolean = false;

  getPassErrorClass() {
    if (!this.firstChargePass) {
      if (!this.passIsFocus) {
        return this.getErrorPass();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getErrorPass() {
    return !this.isPassEmpty() && this.f.pass.errors !== null;
  }
  isPassEmpty() {
    return this.f.pass.value.toString().length === 0;
  }
  getColorIcoPass() {
    if (this.isPassEmpty()) {
      if (this.passIsFocus) {
        return '#43b02a';
      } else {
        return '#E2E2E2';
      }
    } else {
      if (!this.getErrorPass()) {
        return '#43b02a';
      } else {
        return 'red';
      }
    }
  }

  focusInInputPass($event) {
    this.passIsFocus = true;
    this.firstChargePass = false;
  }

  focusOutInputPass($event) {
    this.passIsFocus = false;
  }

  getColorLabelPass() {
    if (this.isPassEmpty()) {
      if (this.passIsFocus) {
        return '#003a70';
      } else {
        return '#9D9D9D';
      }
    } else {
      if (!this.getErrorPass()) {
        return '#003a70';
      } else {
        return 'red';
      }
    }
  }
  getColorBorderPass() {
    if (this.isPassEmpty()) {
      if (this.passIsFocus) {
        return '#003a70';
      } else {
        return '#e2e2e2';
      }
    } else {
      if (!this.getErrorPass()) {
        return '#003a70';
      } else {
        return 'red';
      }
    }
  }

  isVisibleErrorPass() {
    if (this.getErrorPass()) {
      return !this.firstChargePass;
    } else {
      return false;
    }
  }

  togglePass() {
    this.showPass = !this.showPass;
  }


  private callListenerSize() {
    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.showOnlyForm = isLessThanXl;
      });
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isDisabled() {
    return !this.loginForm.valid && this.loading;
  }
}
