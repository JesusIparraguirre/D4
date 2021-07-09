import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef, NbDialogService, NbIconLibraries, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Utils} from "../../../utils";
import {DialogGenericComponent} from "../../../common-components/dialog-generic/dialog-generic.component";
import {AuthenticationRepository} from "../../../../@domain/repository/authentication.repository";
import {UserRepository} from "../../../../@domain/repository/user.respository";

@Component({
  selector: 'dialog-edit-profile',
  templateUrl: './dialog-edit-profile.component.html',
  styleUrls: ['./dialog-edit-profile.component.scss'],
})
export class DialogEditProfileComponent implements OnInit {
  @Input() direccion: string = "";
  @Input() telefono: string = "";
  @Input() correo: string = "";
  @Input() fechanacimiento: string = "";

  @ViewChild('code1', {static: true}) code1Input: ElementRef;

  loading: boolean = false;
  editProfileForm: FormGroup;
  submitted: boolean = false;

  firstChargeFechanacimiento: boolean = true;
  fechanacimientoIsFocus: boolean = false;

  firstChargeDireccion: boolean = true;
  direccionIsFocus: boolean = false;

  firstChargeCorreo: boolean = true;
  correoIsFocus: boolean = false;

  firstChargeTelefono: boolean = true;
  telefonoIsFocus: boolean = false;

  cod1: string = "";
  constructor(
    private userServices: UserRepository,
    private authServices: AuthenticationRepository,
    iconsLibrary:  NbIconLibraries,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogService: NbDialogService,
    protected ref: NbDialogRef<DialogEditProfileComponent>,
    private toastrService: NbToastrService,
  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' });
  }

  get f() { return this.editProfileForm.controls; }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      fechanacimiento: [this.fechanacimiento, [Validators.required]],
      direccion: [this.direccion, [Validators.required]],
      telefono: [this.telefono, [Validators.required]],
      correo: [this.correo, [Validators.required, Validators.email]],
    });
    this.cod1 = this.telefono;
  }
  dismiss() {
    this.ref.close(false);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }
    this.showLoading();
    
    this.userServices.editProfile(
      this.authServices.getCurrentUserValue.idPersona.toString(), 
      this.f.direccion.value, 
      this.cod1, 
      this.f.correo.value,
      this.f.fechanacimiento.value)
      .subscribe(result => {
        
        this.hideLoading();
        if (result) {
          Utils.showToast('Datos guardados correctamente', this.toastrService);
          this.ref.close(true);
        } else {
          this.dialogService.open(DialogGenericComponent, {
            context: {
              body: 'Error al guardar los datos del perfil',
            },
            closeOnBackdropClick: false,
            autoFocus: false,
          }).onClose.subscribe((value: boolean) => {});
        }
      }, error => {
        this.hideLoading();
        this.dialogService.open(DialogGenericComponent, {
          context: {
            body: error.message,
          },
          closeOnBackdropClick: false,
          autoFocus: false,
        }).onClose.subscribe((value: boolean) => {});
      });
  }

  private hideLoading() {
    this.loading = false;
  }
  private showLoading() {
    this.loading = true;
  }

  // init fecha nacimiento
  getFechanacimientoErrorClass() {
    if (!this.firstChargeFechanacimiento) {
      if (!this.fechanacimientoIsFocus) {
        return this.getErrorFechanacimiento();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getErrorFechanacimiento() {
    return this.f.fechanacimiento.value.length == 0;
  }
  getColorIcoFechanacimiento() {
    if (this.fechanacimientoIsFocus) {
      return '#43b02a';
    } else {
      if (this.getErrorFechanacimiento()) {
        if (this.firstChargeFechanacimiento) {
          return '#E2E2E2';
        }
        return 'red';
      } else {
        if (!this.getErrorFechanacimiento()) {
          return '#43b02a';
        } else {
          return '#E2E2E2';
        }
      }
    }
  }

  focusInInputFechanacimiento($event) {
    this.fechanacimientoIsFocus = true;
    this.firstChargeFechanacimiento = false;
  }

  focusOutInputFechanacimiento($event) {
    this.fechanacimientoIsFocus = false;
  }

  getColorLabelFechanacimiento() {
    if (this.fechanacimientoIsFocus) {
      return '#003a70';
    } else {
      if (this.getErrorFechanacimiento()) {
        if (this.firstChargeFechanacimiento) {
          return '#9D9D9D';
        }
        return 'red';
      } else {
        return '#9D9D9D';
      }
    }
  }

  isVisibleErrorFechanacimiento() {
    if (this.getErrorFechanacimiento()) {
      return !this.firstChargeFechanacimiento;
    } else {
      return false;
    }
  }

  // init direccion
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
    return this.f.direccion.value.length == 0;
  }
  getColorIcoDireccion() {
    if (this.direccionIsFocus) {
      return '#43b02a';
    } else {
      if (this.getErrorDireccion()) {
        if (this.firstChargeDireccion) {
          return '#E2E2E2';
        }
        return 'red';
      } else {
        if (!this.getErrorDireccion()) {
          return '#43b02a';
        } else {
          return '#E2E2E2';
        }
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
    if (this.direccionIsFocus) {
      return '#003a70';
    } else {
      if (this.getErrorDireccion()) {
        if (this.firstChargeDireccion) {
          return '#9D9D9D';
        }
        return 'red';
      } else {
        return '#9D9D9D';
      }
    }
  }

  isVisibleErrorDireccion() {
    // if (this.direccionIsFocus) {
    //   return false;
    // } else {
      if (this.getErrorDireccion()) {
        return !this.firstChargeDireccion;
      } else {
        return false;
      }
    // }
  }
  // init email
  getCorreoErrorClass() {
    if (!this.firstChargeCorreo) {
      if (!this.correoIsFocus) {
        return this.getErrorCorreo();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  getErrorCorreo() {
    return this.f.correo.value.length == 0;
  }
  getColorIcoCorreo() {
    if (this.correoIsFocus) {
      return '#43b02a';
    } else {
      if (this.getErrorCorreo()) {
        if (this.firstChargeCorreo) {
          return '#E2E2E2';
        }
        return 'red';
      } else {
        if (!this.getErrorCorreo()) {
          return '#43b02a';
        } else {
          return '#E2E2E2';
        }
      }
    }
  }

  focusInInputCorreo($event) {
    this.correoIsFocus = true;
    this.firstChargeCorreo = false;
  }

  focusOutInputCorreo($event) {
    this.correoIsFocus = false;
  }

  getColorLabelCorreo() {
    if (this.correoIsFocus) {
      return '#003a70';
    } else {
      if (this.getErrorCorreo()) {
        if (this.firstChargeCorreo) {
          return '#9D9D9D';
        }
        return 'red';
      } else {
        return '#9D9D9D';
      }
    }
  }

  isVisibleErrorCorreo() {
    // if (this.CorreoIsFocus) {
    //   return false;
    // } else {
      if (this.getErrorCorreo()) {
        return !this.firstChargeCorreo;
      } else {
        return false;
      }
    // }
  }
  // init telefono

  getTelefonoErrorClass() {
    if (!this.firstChargeTelefono) {
      // if (!this.telefonoIsFocus) {
        return this.getErrorTelefono();
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  }
  getErrorTelefono() {
    return this.f.telefono.value.length  ==  0;
  }
  getColorIcoTelefono() {
    // if (this.telefonoIsFocus) {
    //   return '#43b02a';
    // } else {
      if (this.getErrorTelefono()) {
        if (this.firstChargeTelefono) {
          return '#E2E2E2';
        }
        return 'red';
      } else {
        if (!this.getErrorTelefono()) {
          return '#43b02a';
        } else {
          return '#E2E2E2';
        }
      }
    // }
  }

  focusInInputTelefono($event) {
    this.telefonoIsFocus = true;
    this.firstChargeTelefono = false;
  }

  focusOutInputTelefono($event) {
    this.telefonoIsFocus = false;
  }

  getColorLabelTelefono() {
    // if (this.telefonoIsFocus) {
    //   return '#003a70';
    // } else {
      if (this.getErrorTelefono()) {
        if (this.firstChargeTelefono) {
          return '#9D9D9D';
        }
        return 'red';
      } else {
        return '#9D9D9D';
      }
    // }
  }

  isVisibleErrorTelefono() {
    // if (this.telefonoIsFocus) {
    //   return false;
    // } else {
      if (this.getErrorTelefono()) {
        return !this.firstChargeTelefono;
      } else {
        return false;
      }
    // }
  }
  changedCode1(value) {
    this.cod1 = this.cod1.replace('.', '');
    this.code1Input.nativeElement.value = this.cod1;
    // @ts-ignore
    this.f.telefono.value = this.cod1;
    if ( parseInt(value) == value) {

    } else {
      this.cod1 = value.substr(0, value.length - 1);
      this.code1Input.nativeElement.value = this.cod1;
    }
  }


}
