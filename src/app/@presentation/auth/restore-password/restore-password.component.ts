import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from "../../utils";
import { AuthenticationRepository } from "../../../@domain/repository/authentication.repository";

@Component({
  selector: 'restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  restoreOk: boolean = false;
  noneForm: FormGroup;
  loading = false;
  private userId: string;

  showPasswordConfirmation: boolean = false;
  hasPasswordConfirmationFocus: boolean = false;
  constructor(
    iconsLibrary: NbIconLibraries,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authserv: AuthenticationRepository,
    private toastrService: NbToastrService,
  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' });
  }

    onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.showLoading();
    this.authserv.reestablecePAss(this.userId, this.f.pass.value)
      .subscribe(result => {
        this.hideLoading();
        if (result) {
          this.restoreOk = true;
        } else {
          Utils.showToast('Error al restablecer contraseña', this.toastrService, 'danger');
        }
      }, error => {
        this.hideLoading();
        Utils.showToast(error.message, this.toastrService, 'danger');
      });
    // this.restoreOk = true;
  }

  showLoading() {
    this.loading = true;
  }
  hideLoading() {
    this.loading = false;
  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      pass: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    }, { validators: this.validatePasswordConfirmation });
    this.route.queryParams.subscribe(params => {
      this.userId = atob(this.route.snapshot.fragment);
    });
  }
  validatePasswordConfirmation(abstractControl: AbstractControl): any {
    if (abstractControl.get('pass').value && abstractControl.get('passwordConfirmation').value) {
      if (abstractControl.get('pass').value === abstractControl.get('passwordConfirmation').value) { return null; }
      else { return { differentPassword: true }; }
    } else { return { differentPassword: true }; }
  }
  // custom



  showPass: boolean = false;
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

  getIconColor() {
    if (this.showConfirmationPasswordInvalidState()) return 'red';
    else if (this.f.passwordConfirmation.value || this.hasPasswordConfirmationFocus) return '#43b02a'
    else return '#E2E2E2'
  }
  getLabelColor() {
    if (this.showConfirmationPasswordInvalidState()) return 'red';
    else if (this.f.passwordConfirmation.value || this.hasPasswordConfirmationFocus) return '#43b02a'
    else return '#9D9D9D'
  }
  getBorderColor() {
    if (this.showConfirmationPasswordInvalidState()) return 'red';
    else if (this.f.passwordConfirmation.value || this.hasPasswordConfirmationFocus) return '#003a70'
    else return '#E2E2E2'
  }
  showConfirmationPasswordInvalidState(): boolean {
    return !this.f.passwordConfirmation.pristine && (this.f.passwordConfirmation.invalid || this.registerForm.hasError('differentPassword'));
  }

  togglePasswordConfirmationVisibility() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
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

}
