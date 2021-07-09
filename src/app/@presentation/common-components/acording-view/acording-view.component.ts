import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import Swal from 'sweetalert2';
import { Pregunta, Respuesta } from '../../../@data/model/Preguntas';
import { MantPreguntaService } from '../../../@data/services/mant-pregunta.service';
import { Utils } from '../../utils';

@Component({
  selector: 'acording-view',
  templateUrl: './acording-view.component.html',
  styleUrls: ['./acording-view.component.scss'],
})
export class AcordingViewComponent implements OnInit {

  @Input() pregunta: Pregunta;
  @Input() isMantainer: boolean;

  @Output() eventCheckedQs: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventEditQs: EventEmitter<Pregunta> = new EventEmitter<Pregunta>();
  @Output() eventNewAnswer: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventEditAnswer: EventEmitter<Respuesta> = new EventEmitter<Respuesta>();
  @Output() eventReload: EventEmitter<void> = new EventEmitter<void>();

  open: boolean = false;
  public showEnableDisabledAnws = false;

  constructor(
    private preguntasService: MantPreguntaService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  changeStatus() {
    this.open = !this.open;
  }

  onCheckedQs(event) {
    this.eventCheckedQs.emit();
  }

  onCheckedAnws(event) {
    const respuestasmarcadas = this.getRespuestasMarcadas;
    if (respuestasmarcadas && respuestasmarcadas.length) {
      this.showEnableDisabledAnws = true;
    } else {
      this.showEnableDisabledAnws = false;
    }
  }

  get getRespuestasMarcadas(): Respuesta[] {
    return this.pregunta.respuestas.filter(x => x.checked);
  }

  onEnable() {
    this.preguntasService.editBulkAnswers(this.getRespuestasMarcadas.map(x => x.idRespuesta), 1)
      .subscribe(result => {
        Utils.showToast('Se actualizaron las respuestas correctamente ', this.toastrService);
        this.eventReload.emit();
      }, error => {
        Swal.fire({
          title: 'ADVERTENCIA',
          text: error.message,
          icon: 'warning',
        });
      });
  }

  onDisable() {
    this.preguntasService.editBulkAnswers(this.getRespuestasMarcadas.map(x => x.idRespuesta), 0)
      .subscribe(result => {
        Utils.showToast('Se actualizaron las respuestas correctamente ', this.toastrService);
        this.eventReload.emit();
      }, error => {
        Swal.fire({
          title: 'ADVERTENCIA',
          text: error.message,
          icon: 'warning',
        });
      });
  }

  onEditQs(qs: Pregunta) {
    this.eventEditQs.emit(qs);
  }

  onNewAnswer(id: number) {
    this.eventNewAnswer.emit(id);
  }

  onEditAnswer(resp: Respuesta, idPregunta: number) {
    resp.idPregunta = idPregunta;
    this.eventEditAnswer.emit(resp);
  }
}
