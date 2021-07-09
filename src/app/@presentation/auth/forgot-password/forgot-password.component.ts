import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbDialogService,
  NbIconLibraries,
  NbMediaBreakpointsService,
  NbThemeService,
  NbToastrService,
} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Utils} from "../../utils";
import {DialogGenericComponent} from "../../common-components/dialog-generic/dialog-generic.component";
import {AuthenticationRepository} from "../../../@domain/repository/authentication.repository";

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted: boolean = false;
  showOnlyForm: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  loading = false;

  constructor(
    private iconsLibrary:  NbIconLibraries,
    private authservices: AuthenticationRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
  ) {
    this.iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authservices.forgotPassSendMail(this.f.correo.value)
      .subscribe(
        (data: any) => {
          Utils.showToast('Se ha enviado un código para restablecer su contraseña', this.toastrService);
          this.router.navigate(['/auth/'], { fragment: this.f.correo.value });
        },
        error => {
          this.loading = false;
          this.dialogService.open(DialogGenericComponent, {
            context: {
              body: error.message,
            },
            closeOnBackdropClick: false,
            autoFocus: false,
          }).onClose.subscribe((value: boolean) => {});
        });


  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
    });
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
        this.showOnlyForm = isLessThanXl;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


// Custom Textview

  firstChargeDireccion: boolean = true;
  direccionIsFocus: boolean = false;

  getDireccionErrorClass() {
    if (!this.firstChargeDireccion) {
      if (!this.direccionIsFocus) {
        return this.getErrorDireccion();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getErrorDireccion() {
    return !this.isDireccionEmpty() && this.f.correo.errors !== null;
  }
  isDireccionEmpty() {
    return this.f.correo.value.toString().length === 0;
  }
  getColorIcoDireccion() {
    if (this.isDireccionEmpty()) {
      if (this.direccionIsFocus) {
        return '#43b02a';
      } else {
        return '#E2E2E2';
      }
    } else {
      if (!this.getErrorDireccion()) {
        return '#43b02a';
      } else {
        return 'red';
      }
    }
  }

  focusInInputDireccion($event) {
    this.direccionIsFocus = true;
    this.firstChargeDireccion = false;
  }

  focusOutInputDireccion($event) {
    this.direccionIsFocus = false;
  }

  getColorLabelDireccion() {
    if (this.isDireccionEmpty()) {
      if (this.direccionIsFocus) {
        return '#003a70';
      } else {
        return '#9D9D9D';
      }
    } else {
      if (!this.getErrorDireccion()) {
        return '#003a70';
      } else {
        return 'red';
      }
    }
  }
  getColorBorderDireccion() {
    if (this.isDireccionEmpty()) {
      if (this.direccionIsFocus) {
        return '#003a70';
      } else {
        return '#e2e2e2';
      }
    } else {
      if (!this.getErrorDireccion()) {
        return '#003a70';
      } else {
        return 'red';
      }
    }
  }

  isVisibleErrorDireccion() {
    if (this.getErrorDireccion()) {
      return !this.firstChargeDireccion;
    } else {
      return false;
    }
  }

}
