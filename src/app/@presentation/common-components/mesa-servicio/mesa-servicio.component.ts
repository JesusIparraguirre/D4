import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import Swal from 'sweetalert2';
import { Corporativos, Mesaservicio,  MESASERVICIO_ITEMS } from '../../../@data/model/Datos';
import { AppsService } from '../../../@data/services/apps.service';
import { SessionUserService } from '../../../@data/services/session-user.service';

@Component({
  selector: 'mesa-servicio',
  templateUrl: './mesa-servicio.component.html',
  styleUrls: ['./mesa-servicio.component.scss']
})
export class MesaServicioComponent implements OnInit {
  @Input() _dataMesaservicios: Mesaservicio[];
  dataCorporativos: Corporativos;
  mesaservicioItems = MESASERVICIO_ITEMS;
  dataMesaservicios: Mesaservicio[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private sessionUser: SessionUserService,
    private appservice: AppsService,
  ) { }

  ngOnInit() {
    this.dataMesaservicios = this.config.data._dataMesaservicios;
  }

  IrAMesaServicio(urlApp: string) {
    window.open(urlApp, "_blank");
  }

}
