import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { environment } from "../../constantes";

export class Utils {

  static showToast(title: string, toastrService: NbToastrService, status: NbComponentStatus = 'success') {

    // let statusSuccess: NbComponentStatus = 'success';

    const config = {
      status: status,
      destroyByClick: true,
      duration: environment.TIME_TOAST,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };

    toastrService.show(
      title,
      "",
      config);
  }
}
