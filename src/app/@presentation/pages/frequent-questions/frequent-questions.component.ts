import { Component, OnInit } from '@angular/core';
import { Pregunta, Respuesta } from "../../../@data/model/Preguntas";
import { DialogGenericComponent } from "../../common-components/dialog-generic/dialog-generic.component";
import { NbDialogService, NbMenuService, NbToastrService } from "@nebular/theme";
import { UserRepository } from "../../../@domain/repository/user.respository";
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { DialogEditQuestionComponent } from './dialog-edit-question/dialog-edit-question.component';
import { DialogEditAnswerComponent } from './dialog-edit-answer/dialog-edit-answer.component';
import { MantPreguntaService } from '../../../@data/services/mant-pregunta.service';
import { Utils } from '../../utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.scss'],
})
export class FrequentQuestionsComponent implements OnInit {

  questions: Pregunta[];
  loading: boolean = false;
  public flgMant: boolean;
  public showEnableDisabledQs = false;
  private totalPreguntas : number = 0; 
  private ref: DynamicDialogRef;

  constructor(
    private userServices: UserRepository,
    private dialogService: NbDialogService,
    public pngdialogService: DialogService,
    private activateroute: ActivatedRoute,
    private preguntasService: MantPreguntaService,
    private toastrService: NbToastrService,
    private nbMenuService: NbMenuService,
  ) { }

  ngOnInit() {
    this.activateroute.data.subscribe((data: { mant: boolean }) => {
      this.flgMant = data.mant;
    });
    this.getPreguntasFrecuentes();
  }

  showLoading() {
    this.loading = true;
  }
  hideLoading() {
    this.loading = false;
  }

  private getPreguntasFrecuentes() {
    this.showLoading();
    this.preguntasService.getPreguntasFrecuentes()
      .subscribe((items: Pregunta[]) => {
        this.showEnableDisabledQs = false;
        this.hideLoading();
        if (!this.flgMant) {
          this.questions = items.filter(x => x.idEstado == 1);
          this.questions.forEach(item => {
            item.respuestas = item.respuestas.filter(x => x.idEstado == 1);
          });

        } else {
          this.totalPreguntas = items.length;
          this.questions = items;
        }
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

  onChecked(event) {
    const preguntasmarcadas = this.getPreguntasMarcadas;
    if (preguntasmarcadas && preguntasmarcadas.length) {
      this.showEnableDisabledQs = true;
    } else {
      this.showEnableDisabledQs = false;
    }
  }

  get getPreguntasMarcadas(): Pregunta[] {
    return this.questions.filter(x => x.checked);
  }

  onEnable() {
    this.showLoading();
    this.preguntasService.editBulkQuestions(this.getPreguntasMarcadas.map(x => x.idPregunta), 1)
      .subscribe(result => {
        Utils.showToast('Se actualizaron las preguntas correctamente ', this.toastrService);
        this.getPreguntasFrecuentes();
        this.hideLoading();
      }, error => {
        this.hideLoading();
        Swal.fire({
          title: 'ADVERTENCIA',
          text: error.message,
          icon: 'warning',
        });
      });
  }

  onDisable() {
    this.showLoading();
    this.preguntasService.editBulkQuestions(this.getPreguntasMarcadas.map(x => x.idPregunta), 0)
      .subscribe(result => {
        Utils.showToast('Se actualizaron las preguntas correctamente ', this.toastrService);
        this.getPreguntasFrecuentes();
        this.hideLoading();
      }, error => {
        this.hideLoading();
        Swal.fire({
          title: 'ADVERTENCIA',
          text: error.message,
          icon: 'warning',
        });
      });
  }

  onNewQs() {
    this.ref = this.pngdialogService.open(DialogEditQuestionComponent, {
      data: {
        nuevo: true,
        _totalPreguntas: this.totalPreguntas,
      },
      header: 'Nueva Pregunta',
      width: '50%',
      contentStyle: { "overflow": "auto" },
      // baseZIndex: 10000
    });
    this.ref.onClose.subscribe((resp: any) => {
     
      if (resp) {
        // this.hideLoading();
        this.getPreguntasFrecuentes();
      }
    });
    
  }

  onEditQs(qs: Pregunta) {
    this.ref = this.pngdialogService.open(DialogEditQuestionComponent, {
      data: {
        nuevo: false,
        data: qs,
      },
      header: 'Editar Pregunta',
      width: '50%',
      contentStyle: { "overflow": "auto" },
      // baseZIndex: 10000
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp) {
        this.getPreguntasFrecuentes();
      }
    });
  }

  onNewAnswer(idPregunta: number) {
    let _respuestas = this.questions.find(x => x.idPregunta == idPregunta).respuestas;
    console.log(_respuestas.length);
    this.ref = this.pngdialogService.open(DialogEditAnswerComponent, {
      data: {
        nuevo: true,
        idPregunta,
        _totalRespuestas : _respuestas.length,
      },
      header: 'Nueva Respuesta a la pregunta: ' + this.questions.filter(x => x.idPregunta == idPregunta).map(y => y.descripcion),
      width: '50%',
      contentStyle: { "overflow": "auto" },
      // baseZIndex: 10000
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp) {
        this.getPreguntasFrecuentes();
      }
    });
  }

  onEditAnswer(resp: Respuesta) {
    this.ref = this.pngdialogService.open(DialogEditAnswerComponent, {
      data: {
        nuevo: false,
        data: resp,
        idPregunta: resp.idPregunta
      },
      header: 'Editar Respuesta a la pregunta: ' + this.questions.filter(x => x.idPregunta == resp.idPregunta).map(y => y.descripcion),
      width: '50%',
      contentStyle: { "overflow": "auto" },
    });
    this.ref.onClose.subscribe((resp: any) => {
      if (resp) {
        this.getPreguntasFrecuentes();
      }
    });
  }

  onReload() {
    this.getPreguntasFrecuentes();
  }
}
