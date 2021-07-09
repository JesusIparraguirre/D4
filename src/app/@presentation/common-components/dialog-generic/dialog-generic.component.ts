import { Component, Input } from '@angular/core';
import { NbDialogRef, NbIconLibraries } from "@nebular/theme";

@Component({
  selector: 'dialog-generic',
  templateUrl: './dialog-generic.component.html',
  styleUrls: ['./dialog-generic.component.scss'],
})
export class DialogGenericComponent {

  @Input() title?: string = '¡Ocurrió un error!';
  @Input() body?: string = "";
  @Input() colorIcon?: string = '#db3914';
  @Input() imageIcon?: boolean = false;
  @Input() icon?: string = 'close-circle-outline';
  @Input() textButtom?: string = 'Volver a intentar';
  @Input() success?: boolean = false;
  @Input() responseCode?: string = "";
  @Input() responseValue?: string = "";

  constructor(iconsLibrary: NbIconLibraries, protected ref: NbDialogRef<DialogGenericComponent>) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    if (this.body === undefined) {
      this.body = "";
    }
  }

  close() {
    this.ref.close(false);
  }
  dismiss() {
    if (this.responseCode == "5054") {
      window.location.href = this.responseValue;
    } else {
      this.ref.close(true);
    }
  }

  getBody() {
    return this.body === undefined || this.body.length === 0 ? "Ocurrió un error en la solicitud, por favor, intente nuevamente" : this.body;
  }
}
