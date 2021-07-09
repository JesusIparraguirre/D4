import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Corporativos, Personales, UnidadNegocio } from "../../../@data/model/Datos";
import { User } from "../../../@data/model/User";
import { EventEmmitGeneric } from "../../common-components/viewservices/event.emmiter.service";
import { NbDialogService, NbMediaBreakpointsService, NbThemeService, NbToastrService } from "@nebular/theme";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { DialogEditProfileComponent } from "./dialog-edit-profile/dialog-edit-profile.component";
import { DialogGenericComponent } from "../../common-components/dialog-generic/dialog-generic.component";
import { AuthenticationRepository } from "../../../@domain/repository/authentication.repository";
import { UserRepository } from "../../../@domain/repository/user.respository";
import { SessionUserService } from '../../../@data/services/session-user.service';
import { ConfigService } from '../../../@data/services/config.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {

  picture: string = "https://www.physiorehabgroup.co.nz/wp-content/uploads/generic-profile-square-580x580.jpg";

  dataPersonales: Personales = new Personales();
  dataCorporativos: Corporativos = new Corporativos();
  nombreEmpresas: string;
  nombreUnidadesNegocio: string = "";
  user: User;
  private destroy$: Subject<void> = new Subject<void>();
  responsive: boolean = false;
  loading: boolean = false;
  file: File;
  FotoTipoImagenes: string = '';

  constructor(
    private authServices: AuthenticationRepository,
    private router: Router,
    private userServices: UserRepository,
    private messageService: EventEmmitGeneric,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private sessionService: SessionUserService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.loadData();
    this.user = this.authServices.getCurrentUserValue;

    const { md } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((result: boolean) => {
        this.responsive = result;
      });
    this.FotoTipoImagenes = this.configService.getFotoTipoImagenes();
    this.FotoTipoImagenes = this.FotoTipoImagenes ? this.FotoTipoImagenes.toLowerCase() : '';
  }

  private hideLoading() {
    this.loading = false;
  }
  private showLoading() {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.sendMessage();
  }
  ngOnDestroy() {
    this.clearMessages();
  }

  logout() {
    this.authServices.logout(this.user.id, true);
    this.router.navigate(['/auth/']);
  }

  sendMessage(): void {
    this.messageService.sendMessage('Message from Home Component to App Component!');
  }

  clearMessages(): void {
    this.messageService.clearMessages();
  }

  openDialogEdit(data: Personales) {
    this.dialogService.open(DialogEditProfileComponent, {
      context: {
        direccion: data.direccion,
        telefono: data.telefono,
        correo: data.email,
        fechanacimiento: moment(data.fechaNacimiento).format("YYYY-MM-DD"),
      },
      closeOnBackdropClick: false,
      autoFocus: false,
      closeOnEsc: false,
    }).onClose.subscribe((value: boolean) => {
      if (value)
        this.loadData();
    });
  }

  private loadData() {
    this.showLoading();
    this.userServices.getPersonalInfo()
      .subscribe(async data => {
        this.hideLoading();
        this.sessionService.setDatosPersonales(data);
        this.dataPersonales = data.personales;
        this.dataCorporativos = data.corporativos;

        // this.nombreEmpresas = this.dataCorporativos.empresas.map(x => x.nombre).join(',')
        // this.nombreUnidadesNegocio = this.dataCorporativos.unidadesnegocio.map(x=>x.nombre).join(',');

        let _dataCorporativoEmpresa = this.dataCorporativos.empresas;
        this.nombreEmpresas = _dataCorporativoEmpresa.filter(x => x.id == 0 && x.nombre != '').length == 1 ?
          _dataCorporativoEmpresa.find(x => x.id == 0).nombre :
          _dataCorporativoEmpresa.filter(x => x.id > 0).map(z => z.nombre).join(',');

        let _dataCorporativoUnidadNegocio = await this.filtraUnidadesNegocio(this.dataCorporativos.unidadesnegocio);
        this.nombreUnidadesNegocio = "";
        _dataCorporativoEmpresa.forEach(item => {
          const unidadNegocio = _dataCorporativoUnidadNegocio.filter(x => x.idEmpresa == item.id).map(y => y.nombre).join(",");
          this.nombreUnidadesNegocio += unidadNegocio;

          if (unidadNegocio != "")
            this.nombreUnidadesNegocio += "<br/>"
        })

        if (data.personales.foto != null && data.personales.foto.length !== 0)
          this.picture = data.personales.foto;
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

  filtraUnidadesNegocio(dataCorporativoUnidadNegocio): UnidadNegocio[] {
    let idEmpresa = 0;
    let result: UnidadNegocio[] = new Array();

    for (let item of dataCorporativoUnidadNegocio) {
      if (item.idEmpresa == 0) {
        result.push(item);
        break;
      }
      else {
        let itemTodos = dataCorporativoUnidadNegocio.find(x => x.id == 0 && x.idEmpresa == item.idEmpresa);

        if (itemTodos != undefined) {
          if (idEmpresa != item.idEmpresa) {
            result.push(itemTodos);
            idEmpresa = item.idEmpresa;
          }
        }
        else
          result.push(item);
      }
    };
    return result;
  }

  openDialogLogout() {
    this.dialogService.open(DialogGenericComponent, {
      context: {
        title: '¡Atento!',
        body: '¿Estás seguro que deseas cerrar tu sesión?',
        textButtom: 'Sí',
        icon: 'assets/images/alert.svg',
        imageIcon: true,
        colorIcon: '#FEE340',
        success: true,
      },
      closeOnBackdropClick: false,
      autoFocus: false,
      closeOnEsc: false,
    }).onClose.subscribe((value: boolean) => {
      if (value)
        this.logout();
    });
  }

  isValidUser() {
    return this.authServices.getCurrentUserValue.idPersona !== 0;
  }

  onFileChange(ev) {
    this.file = ev.target.files[0];

    const fileKB = this.file.size * 0.001;
    const fileType = this.file.type.toLowerCase();
    const FotoTamanioMaximoKB = this.configService.getFotoTamanioMaximo();

    if (this.file && fileKB <= FotoTamanioMaximoKB && this.FotoTipoImagenes.includes(fileType)
    ) {
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(this.file);
    } else {
      Swal.fire({
        title: 'Atención',
        text: `Error al adjuntar imagen. El tamaño no puede exceder a ${FotoTamanioMaximoKB} KB y debe ser de tipo ${this.FotoTipoImagenes}, intente nuevamente`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      })
    }
  }

  cleanAndClick(inputfile: HTMLInputElement) {
    inputfile.value = '';
    inputfile.click();
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    let data = "data:image/" + this.file.name.split(".")[1] + ";base64," + btoa(binaryString);
    this.showLoading();
    this.userServices.saveFoto(this.authServices.getCurrentUserValue.idPersona.toString(), data)
      .subscribe(result => {
        this.loadData();
        this.messageService.reloadUser();
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
}
