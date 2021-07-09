import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrequentQuestionsComponent } from './frequent-questions.component';
import { NbAccordionModule, NbButtonModule, NbLayoutModule, NbTooltipModule } from "@nebular/theme";
import { CommonComponentsModule } from "../../common-components/common-components.module";
import { AppLoaderModule } from "../../app-loader/app-loader.module";
import { DialogService, DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { DialogEditQuestionComponent } from './dialog-edit-question/dialog-edit-question.component';
import { DialogEditAnswerComponent } from './dialog-edit-answer/dialog-edit-answer.component';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';

@NgModule({
  declarations: [
    FrequentQuestionsComponent,
    DialogEditQuestionComponent,
    DialogEditAnswerComponent,
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbAccordionModule,
    NbButtonModule,
    CommonComponentsModule,
    AppLoaderModule,
    NbTooltipModule,
    DynamicDialogModule,
    InputSwitchModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DialogEditQuestionComponent,
    DialogEditAnswerComponent,
  ],
  providers: [DialogService]
})
export class FrequentQuestionsModule { }
