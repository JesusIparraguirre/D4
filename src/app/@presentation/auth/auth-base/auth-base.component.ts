import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbIconLibraries} from '@nebular/theme';
import {EventEmmitGeneric} from "../../common-components/viewservices/event.emmiter.service";

@Component({
  selector: 'auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
})
export class AuthBaseComponent implements OnInit, OnDestroy {
  constructor(
    iconsLibrary:  NbIconLibraries,
    private messageService: EventEmmitGeneric,
  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  ngOnDestroy(): void {
    this.messageService.clearMessages();
  }
  ngOnInit(): void {
    this.messageService.sendMessage("prueba");
  }
}
