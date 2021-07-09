import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NbDialogService,
  NbIconLibraries,
  NbMediaBreakpointsService,
  NbThemeService,
  NbToastrService,
} from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Utils } from "../../utils";
import { DialogGenericComponent } from "../../common-components/dialog-generic/dialog-generic.component";
import { AuthenticationRepository } from "../../../@domain/repository/authentication.repository";

@Component({
  selector: 'code-auth',
  templateUrl: './code-auth.component.html',
  styleUrls: ['./code-auth.component.scss'],
})
export class CodeAuthComponent implements OnInit, OnDestroy {

  @ViewChild('code1', { static: true }) code1Input: ElementRef;
  @ViewChild('code2', { static: true }) code2Input: ElementRef;
  @ViewChild('code3', { static: true }) code3Input: ElementRef;
  @ViewChild('code4', { static: true }) code4Input: ElementRef;

  codeForm: FormGroup;
  submitted: boolean = false;
  correo: String = '';
  showOnlyForm: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  loading = false;
  userid: string = "";

  cod2: string = "";
  cod3: string = "";
  cod4: string = "";
  cod1: string = "";

  firtCharge: boolean = true;

  constructor(
    iconsLibrary: NbIconLibraries,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private authserv: AuthenticationRepository,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' });
    this.route.queryParams.subscribe(params => {
      let encrypt: string = params['q'];
      if (encrypt != null && encrypt.length !== 0) {
        this.userid = atob(encrypt).trim(); // Print the parameter to the console.
      } else {
        this.router.navigate(['/auth/']);
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.allEmpty()) {
      return;
    }
    // this.router.navigate(['/auth/restore-password/']);
    this.showLoading();
    this.authserv.verificaCodigo(this.userid, this.getCode())
      .subscribe(result => {
        this.hideLoading();
        if (result) {
          this.router.navigate(['/auth/restore-password/'], { fragment: btoa(this.userid) });
        } else {
          Utils.showToast('Error al enviar códio', this.toastrService);
        }
      }, error => {
        this.hideLoading();
        this.dialogService.open(DialogGenericComponent, {
          context: {
            body: error.message,
          },
          closeOnBackdropClick: false,
          autoFocus: false,
        }).onClose.subscribe((value: boolean) => { });
      });
  }

  getCode() {
    return this.f.code1.value + "" + this.f.code2.value + "" + this.f.code3.value + "" + this.f.code4.value + "";
  }
  showLoading() {
    this.loading = true;
  }
  hideLoading() {
    this.loading = false;
  }

  get f() { return this.codeForm.controls; }

  ngOnInit(): void {
    this.logout();
    this.codeForm = this.formBuilder.group({
      code1: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1), Validators.min(0), Validators.max(9)]],
      code2: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1), Validators.min(0), Validators.max(9)]],
      code3: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1), Validators.min(0), Validators.max(9)]],
      code4: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1), Validators.min(0), Validators.max(9)]],
    });
    this.callListenerSize();
    this.code4Input.nativeElement.focus();
    this.code3Input.nativeElement.focus();
    this.code2Input.nativeElement.focus();
    this.code1Input.nativeElement.focus();
  }

  logout() {
    const user = this.authserv.getCurrentUserValue;

    if (user != undefined)
      this.authserv.logout(user.id, true);
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

  allEmpty() {
    return this.f.code1.value.toString().length !== 0 &&
      this.f.code2.value.toString().length !== 0 &&
      this.f.code3.value.toString().length !== 0 &&
      this.f.code4.value.toString().length !== 0;
  }


  // code1
  isFocusCode1: boolean = false;

  focusInInputCode1($event) {
    this.isFocusCode1 = true;
  }
  changedCode1(value) {
    if (parseInt(value) == value) {
      if (value.toString().length === 0) {
        // en otros deveria cambiar el lsitenr al anterior
      } else {
        this.code2Input.nativeElement.focus();
      }
    } else {
      this.cod1 = "";
      this.code1Input.nativeElement.value = "";
    }
  }

  focusOutInputCode1($event) {
    this.isFocusCode1 = false;
  }

  getColorBorderCode1() {
    if (this.isFocusCode1) {
      return '#003a70';
    } else {
      return '#e2e2e2';
    }
  }
  // code2
  isFocusCode2: boolean = false;
  changedCode2(value) {
    if (parseInt(value) == value) {
      if (value.toString().length === 0) {
        this.code1Input.nativeElement.focus();
      } else {
        this.code3Input.nativeElement.focus();
      }
    } else {
      this.cod2 = "";
      this.code2Input.nativeElement.value = "";
    }

  }
  focusInInputCode2($event) {
    this.isFocusCode2 = true;
  }

  focusOutInputCode2($event) {
    this.isFocusCode2 = false;
  }

  getColorBorderCode2() {
    if (this.isFocusCode2) {
      return '#003a70';
    } else {
      return '#e2e2e2';
    }
  }
  // code3
  isFocusCode3: boolean = false;
  changedCode3(value) {
    if (parseInt(value) == value) {
      if (value.toString().length === 0) {
        this.code2Input.nativeElement.focus();
      } else {
        this.code4Input.nativeElement.focus();
      }
    } else {
      this.cod3 = "";
      this.code3Input.nativeElement.value = "";
    }

  }
  focusInInputCode3($event) {
    this.isFocusCode3 = true;
  }

  focusOutInputCode3($event) {
    this.isFocusCode3 = false;
  }

  getColorBorderCode3() {
    if (this.isFocusCode3) {
      return '#003a70';
    } else {
      return '#e2e2e2';
    }
  }
  // code4
  isFocusCode4: boolean = false;
  changedCode4(value) {
    if (parseInt(value) == value) {
      if (this.firtCharge) {
        this.firtCharge = false;
        this.code1Input.nativeElement.focus();
      } else {
        if (value.toString().length === 0) {
          this.code3Input.nativeElement.focus();
        } else {
          // this.code3Input.nativeElement.focus();
        }
      }
    } else {
      this.cod4 = "";
      this.code4Input.nativeElement.value = "";
    }

  }
  focusInInputCode4($event) {
    this.isFocusCode4 = true;
  }

  focusOutInputCode4($event) {
    this.isFocusCode4 = false;
  }

  getColorBorderCode4() {
    if (this.isFocusCode4) {
      return '#003a70';
    } else {
      return '#e2e2e2';
    }
  }
}
