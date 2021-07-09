import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import Swal from 'sweetalert2';
import { Respuesta } from '../../../../@data/model/Preguntas';
import { MantPreguntaService } from '../../../../@data/services/mant-pregunta.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'dialog-edit-answer',
  templateUrl: './dialog-edit-answer.component.html',
  styleUrls: ['./dialog-edit-answer.component.scss']
})
export class DialogEditAnswerComponent implements OnInit {
  @Input() nuevo: boolean;
  @Input() data: Respuesta;
  @Input() idPregunta: number;
  @Input() _totalRespuestas: number;

  public myForm: FormGroup;
  public submitted: boolean = false;
  public orden: number = 1;
  loading: boolean = false;

  constructor(

    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private respuestasService: MantPreguntaService,
    private toastrService: NbToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.nuevo = this.config.data.nuevo;
    this.data = this.config.data.data;
    this.idPregunta = this.config.data.idPregunta;
    this.myForm = this.fb.group({
      descripcion: [null, Validators.required],
      estado: [{ value: true, disabled: this.nuevo }]
    });

    this.orden = this.config.data._totalRespuestas + 1;
    if (!this.nuevo) {
      this.cargarControlesEditar();
    }
  }

  get f() { return this.myForm.controls; }

  getLabelStatus() {
    return this.myForm.get('estado').value ? 'Activo' : 'Inactivo';
  }

  aumentar() {
    let cant = this.orden;
    if (this.config.data._totalRespuestas >= cant) this.orden++;
  }

  disminuir() {
    let cant = this.orden;
    cant--;
    if (cant < 1) cant = 1;
    this.orden = cant;
  }

  private obtenerDatos(): Respuesta {
    const respuesta = new Respuesta();
    respuesta.descripcion = this.myForm.getRawValue().descripcion;
    respuesta.idEstado = this.myForm.getRawValue().estado ? 1 : 0;
    respuesta.orden = this.orden;
    respuesta.idPregunta = this.idPregunta;
    return respuesta;
  }

  private cargarControlesEditar() {
    if (this.data) {
      this.myForm.setValue({
        descripcion: this.data.descripcion,
        estado: this.data.idEstado === 1 ? true : false,
      });
      this.orden = this.data.orden;
    }
  }

  showLoading() {
    this.loading = true;
  }
  hideLoading() {
    this.loading = false;
  }

  submit() {
    if (!this.myForm.valid) return;

    this.showLoading();

    if (this.nuevo) {
      this.respuestasService.saveRespuestaFrecuente(this.obtenerDatos())
        .subscribe(result => {
          this.hideLoading();
          Utils.showToast('Se registró correctamente la respuesta', this.toastrService);
          this.ref.close(true);
        }, error => {
          this.hideLoading();
          Swal.fire({
            title: 'ADVERTENCIA',
            text: error.message,
            icon: 'warning',
          });
        });
    } else {
      this.respuestasService.editRespuestaFrecuente(this.data.idRespuesta, this.obtenerDatos())
        .subscribe(result => {
          this.hideLoading();
          Utils.showToast('Se actualizó correctamente la respuesta', this.toastrService);
          this.ref.close(true);
        }, error => {
          this.hideLoading();
          Swal.fire({
            title: 'ADVERTENCIA',
            text: error.message,
            icon: 'warning',
          });
        });
    }
  }
}
