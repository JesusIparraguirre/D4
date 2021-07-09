import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbUserModule,
} from "@nebular/theme";
import {DialogEditProfileComponent} from './dialog-edit-profile/dialog-edit-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppLoaderModule} from "../../app-loader/app-loader.module";


@NgModule({
  declarations: [ProfileComponent, DialogEditProfileComponent],
    imports: [
        CommonModule,
        NbLayoutModule,
        NbUserModule,
        NbActionsModule,
        NbDialogModule.forChild(),
        NbButtonModule,
        NbCardModule,
        NbIconModule,

        ReactiveFormsModule,
        NbInputModule,
        AppLoaderModule,
    ],
  entryComponents: [DialogEditProfileComponent],
})
export class ProfileModule { }
