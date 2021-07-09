import { Component, OnInit } from '@angular/core';
import { User } from "../../../@data/model/User";
import { NbIconLibraries } from "@nebular/theme";
import { Aplicaciones } from "../../../@data/model/app";
import { CommonComponentsModule } from "../../common-components/common-components.module";
import { AppsRepository } from "../../../@domain/repository/apps.repository";
import { AuthenticationRepository } from "../../../@domain/repository/authentication.repository";
import { ConfigService } from '../../../@data/services/config.service';
import { Const } from '../../../@data/services/const';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  user: User;
  appsAll: Aplicaciones = new Aplicaciones();
  titleAppsStart: string = CommonComponentsModule.titleAppsStart;
  titleAppsMoreToUse: string = CommonComponentsModule.titleAppsMoreToUse;
  titleAppsAll: string = CommonComponentsModule.titleAppsAll;
  titleAppsFuture: string = CommonComponentsModule.titleAppsFuture;
  isInputFocus = true;
  searchText;

  emptyAppPin: string = CommonComponentsModule.emptyAppPin;
  emptyAppTitle: string = CommonComponentsModule.emptyAppTitle;
  emptyAppSubTitle: string = CommonComponentsModule.emptyAppSubTitle;

  isgrid = true;

  constructor(
    iconsLibrary: NbIconLibraries,
    private authenticationService: AuthenticationRepository,
    private appsService: AppsRepository,
    private configService: ConfigService) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  ngOnInit() {
    this.obteneDetalleUser();
    this.getApps();
    this.getFotoTamanioMaximoKB();
    this.getFotoTipoImagenes();
  }
  private obteneDetalleUser() {
    this.user = this.authenticationService.getCurrentUserValue;
  }
  handleFocusInput() {
    // this.isInputFocus = true;
  }

  handleBlurInput() {
    // this.isInputFocus = false;
  }

  sendReloadApps($event: boolean) {
    this.getApps();
  }

  getFotoTamanioMaximoKB() {
    this.configService.getParametroConfiguracion(Const.PARAMETRO.FOTO_TAMANIO_MAX_KB)
      .subscribe(
        (result) => {
          this.configService.setFotoTamanioMaximo(result.valor);
        }
      )
  }

  getFotoTipoImagenes() {
    this.configService.getParametroConfiguracion(Const.PARAMETRO.FOTO_TIPO_IMAGENES)
      .subscribe(
        (result) => {
          this.configService.setFotoTipoImagenes(result.valor);
        }
      )
  }

  private getApps() {
    this.appsService.getAll()
      .subscribe((appsList: Aplicaciones) => {
        this.appsAll = appsList;
      });
  }
}
