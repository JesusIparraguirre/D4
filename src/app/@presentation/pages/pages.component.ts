import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MENU_ITEMS } from './pages-menu';
import { NbIconLibraries, NbMediaBreakpointsService, NbMenuService, NbThemeService } from "@nebular/theme";
import { Router } from "@angular/router";
import { map, takeUntil } from "rxjs/operators";
import { User } from "../../@data/model/User";
import { Subject, Subscription } from "rxjs";
import { EventEmmitGeneric } from "../common-components/viewservices/event.emmiter.service";
import { AuthenticationRepository } from "../../@domain/repository/authentication.repository";
import { AccesoService } from '../../@data/services/acceso.service';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { MesaServicioComponent } from '../common-components/mesa-servicio/mesa-servicio.component';
import { SessionUserService } from '../../@data/services/session-user.service';
import { UserRepository } from '../../@domain/repository/user.respository';
import { Corporativos, MESASERVICIO_ITEMS, Personales } from '../../@data/model/Datos';
import { AppsService } from '../../@data/services/apps.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private alive: boolean = true;
  tagUserMenu = 'usermenu';
  userPictureOnly: boolean = false;
  user: User;
  menu = MENU_ITEMS;
  messages: any[] = [];
  subscription: Subscription;
  isActiveProfile: boolean = false;
  dataPersonales: Personales = new Personales();
  dataCorporativos: Corporativos = new Corporativos();
  mesaservicioItems = MESASERVICIO_ITEMS;
  loading: boolean = false;

  constructor(iconsLibrary: NbIconLibraries,
    private nbMenuService: NbMenuService,
    private router: Router,
    private authenticationService: AuthenticationRepository,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private messageService: EventEmmitGeneric,
    private accesoService: AccesoService,
    private dialogService: DialogService,
    private sessionUser: SessionUserService,
    private userServices: UserRepository,
    private appservice: AppsService,
  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.obteneDetalleUser();
    this.isActiveProfile = false;
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        this.isActiveProfile = true;
      } else {
        // clear messages when empty message received
        this.messages = [];
        this.isActiveProfile = false;
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.authenticationService.logout(this.user.id, true);
    this.router.navigate(['/auth/login']);
  }

  private obteneDetalleUser() {
    this.user = this.authenticationService.getCurrentUserValue;
  }

  openProfile() {
    this.router.navigate(['/pages/profile']);
  }

  ngOnInit() {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.userPictureOnly = isLessThanXl;
      });

    this.loadData();

    this.nbMenuService.onItemClick().subscribe(val => {
      if (val && val.item && val.item.link == 'popup-mesa-servicios') {
        this.IrAMesaServicio();
      }
    });
    this.consultarOpcionesMenu();

  }

  consultarOpcionesMenu() {
    this.accesoService.getOptionsMenu().subscribe(val => {
      if (val.length) {
        let menuCopy = this.menu.map((x) => ({ ...x }));
        menuCopy = menuCopy.concat(val);
        this.menu = menuCopy;
      }
      else {
        Swal.fire({
          title: "OPCIONES MENÚ",
          text: "No se encontraron opciones disponibles, esto puede deberse a la falta de asignación de permisos.",
          icon: "error",
          onAfterClose: () => this.logout()
        });
      }
    });
  }

  private loadData() {
    this.userServices.getPersonalInfo()
      .subscribe(data => {
        this.sessionUser.setDatosPersonales(data);
        this.dataPersonales = data.personales;
        this.dataCorporativos = data.corporativos;

      },
      );
  }

  private hideLoading() {
    this.loading = false;
  }
  private showLoading() {
    this.loading = true;
  }

  IrAMesaServicio() {
    this.showLoading();
    this.appservice.getUrlApp()
      .subscribe(val => {
        this.hideLoading();
        let mesaservicioCopy = this.mesaservicioItems.map((x) => ({ ...x }));
        mesaservicioCopy = mesaservicioCopy.concat(val);
        if (mesaservicioCopy.length == 0) {
          Swal.fire({
            title: 'ADVERTENCIA',
            text: 'No se ha definido un ámbito para el usuario',
            icon: 'warning',
          });
        }
        else if (mesaservicioCopy.length == 1) window.open(mesaservicioCopy.map(x => x.url).toString(), "_blank");
        else {
          const ref = this.dialogService.open(MesaServicioComponent, {
            data: {
              _dataMesaservicios: mesaservicioCopy
            },
            header: 'Elija la empresa por la cual desea abrir la mesa de servicio',
            width: '40%'
          });
        }
      }, error => {
        this.hideLoading();
        Swal.fire({
          title: error.titulo,
          text: error.message,
          icon: 'warning',
        });
      });

  }
}
