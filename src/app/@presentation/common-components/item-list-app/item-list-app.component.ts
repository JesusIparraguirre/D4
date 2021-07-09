import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { App } from "../../../@data/model/app";
import { NbContextMenuDirective, NbDialogService, NbIconLibraries, NbMenuBag, NbMenuItem, NbMenuService, NbToastrService, NB_WINDOW } from "@nebular/theme";
import { AppsService, AuthenticationService } from "../../../@data/services";
import { Utils } from "../../utils";
import { DialogGenericComponent } from "../dialog-generic/dialog-generic.component";
import { environment } from "../../../../constantes";
import Swal from 'sweetalert2';
import { newGuid } from '../../../@data/util/functions';
import { filter } from 'rxjs/operators';
import { Const } from '../../../@data/services/const';

@Component({
  selector: 'item-list-app',
  templateUrl: './item-list-app.component.html',
  styleUrls: ['./item-list-app.component.scss'],
})
export class ItemListAppComponent implements OnInit {
  public itemsContextMenu: NbMenuItem[] = new Array();

  @ViewChild(NbContextMenuDirective, { static: true }) contextMenu: NbContextMenuDirective;
  @Input() esProximoLanzamiento: boolean = false;
  @Input() app: App;
  @Input() isFavorite?: boolean = false;
  @Output() sendReload: EventEmitter<boolean> = new EventEmitter<boolean>();

  descriptionSuccessAdd: string = environment.DESCRIPTIONSUCCESSADD;
  descriptionSuccessRemove: string = environment.DESCRIPTIONSUCCESSREMOVE;
  loading: boolean = false;

  public contextMenuTag: string;
  private menuContextShow = true;

  constructor(
    private appsServices: AppsService,
    private toastrService: NbToastrService,
    private iconsLibrary: NbIconLibraries,
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    private authService: AuthenticationService,
  ) {
    this.iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion-md' });
  }

  ngOnInit() {
    this.loadMultipleDespliegue();
  }

  setFavorite(pref: number) {
    Swal.fire({
      title: 'Destacados',
      text: pref == 1 ? '¿Desea destacar la aplicación?' : '¿Desea quitar la aplicación de destacados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoading();
        this.appsServices.setPref(this.app.id, pref)
          .subscribe(result => {
            this.hideLoading();
            this.app.destacadas = !this.app.destacadas;
            Utils.showToast(this.app.destacadas ? this.descriptionSuccessAdd : this.descriptionSuccessRemove, this.toastrService);
            this.sendReload.emit(true);
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
    })
  }
  addVisit() {
    this.showLoading();
    this.appsServices.addVisit(this.app.id)
      .subscribe(result => {
        this.hideLoading();
        this.sendReload.emit(true);
      }, error => {
        this.hideLoading();
      });
  }

  private hideLoading() {
    this.loading = false;
  }

  private showLoading() {
    this.loading = true;
  }

  loadMultipleDespliegue() {
    if (this.existsMultipleUrl) {
      this.app.despliegues.forEach(item => {
        this.itemsContextMenu.push({
          title: item.nombreEmpresa,
          data: {
            url: item.urlEmpresa
          }
        });
      });
    } else {
      let url = this.app.despliegues && this.app.despliegues.length === 1 ? this.app.despliegues[0].urlEmpresa : this.app.url;
      url = url ? url : '';
      this.itemsContextMenu.push({
        title: this.app.nombre,
        data: {
          url: url
        }
      });
    }

    this.contextMenuTag = newGuid();
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === this.contextMenuTag),
      )
      .subscribe((elemento: NbMenuBag) => {
        this.menuContextShow = true;
        this.openNewTab(elemento.item.data.url);
      });
  }


  openApp() {
    if (this.esProximoLanzamiento) return;

    if (this.app.idTipoAplicacion === Const.TIPO_APLICACION.MOVIL || this.app.idTipoAplicacion === Const.TIPO_APLICACION.ESCRITORIO) {
      Swal.fire({
        title: 'ADVERTENCIA',
        text: `No se puede redireccionar a una aplicación tipo ${this.app.tipoAplicacion} desde este aplicativo`,
        icon: 'warning',
      });
      return;
    }

    if (this.app.idTipoAplicacion === Const.TIPO_APLICACION.WEB && !this.app.url) {
      Swal.fire({
        title: 'ADVERTENCIA',
        text: 'La Aplicación no tiene una URL asignada',
        icon: 'warning',
      });
      return;
    }

    if (this.existsMultipleUrl) {
      if (this.menuContextShow)
        this.open();
      else
        this.close();
      this.menuContextShow = !this.menuContextShow;
    } else {
      const url = this.app.despliegues && this.app.despliegues.length === 1 ? this.app.despliegues[0].urlEmpresa : this.app.url;
      this.openNewTab(url);
    }
  }

  openNewTab(url: string, idempresa?: number) {
    if (this.isAppSingleSignOn) {
      this.showLoading();
      this.authService.getAuthorizationCode(url, idempresa).subscribe(({ location }) => {
        this.hideLoading();
      }, (error) => {
        this.hideLoading();
        if (error.status && error.status === 302) {
          window.open(error.error.location, '_blank');
          this.addVisit();
        } else {
          Swal.fire({
            title: 'ADVERTENCIA',
            text: error && error.message ? error.message : 'Ocurrió un error al intentar consultar el código de autorización para la aplicación',
            icon: 'warning',
          });
        }
      });
    } else {
      window.open(url, '_blank');
      this.addVisit();
    }
  }

  open() {
    this.contextMenu.show();
  }

  close() {
    this.contextMenu.hide();
  }

  get existsMultipleUrl(): boolean {
    if (this.app.despliegues && this.app.despliegues.length > 1)
      return true;
    return false;
  }

  get isAppSingleSignOn(): boolean {
    if (this.app.esAppInterno && !this.app.esLanzador)
      return true;
    return false;
  }

}
