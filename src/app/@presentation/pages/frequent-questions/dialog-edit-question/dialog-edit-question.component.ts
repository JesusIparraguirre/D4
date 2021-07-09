import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { timeStamp } from 'console';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import Swal from 'sweetalert2';
import { runInThisContext } from 'vm';
import { Pregunta, Respuesta } from '../../../../@data/model/Preguntas';
import { MantPreguntaService } from '../../../../@data/services/mant-pregunta.service';
import { Utils } from '../../../utils';

@Component({
  selector: 'dialog-edit-question',
  templateUrl: './dialog-edit-question.component.html',
  styleUrls: ['./dialog-edit-question.component.scss']
})
export class DialogEditQuestionComponent implements OnInit {

  @Input() nuevo: boolean;
  @Input() data: Respuesta;
  @Input() _totalPreguntas: number;
  public myForm: FormGroup;
  public submitted: boolean = false;
  public orden: number = 1;
  loading: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private preguntasService: MantPreguntaService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.nuevo = this.config.data.nuevo;
    this.data = this.config.data.data;
    this.myForm = this.fb.group({
      descripcion: [null, Validators.required],
      estado: [{ value: true, disabled: this.nuevo }]
    });
    
    this.orden = this.config.data._totalPreguntas + 1;
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
    if (this.config.data._totalPreguntas >= cant) this.orden++;
  }

  disminuir() {
    let cant = this.orden;
    cant--;
    if (cant < 1) cant = 1;
    this.orden = cant;
  }

  private showLoading() {
    this.loading = true;
  }
  private hideLoading() {
    this.loading = false;
  }

  submit() {
    if (!this.myForm.valid) return;

    this.showLoading();

    if (this.nuevo) {
      this.preguntasService.savePreguntaFrecuente(this.obtenerDatos())
        .subscribe(result => {
          this.hideLoading();
          Utils.showToast('Se registró correctamente la pregunta', this.toastrService);
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
      this.preguntasService.editPreguntaFrecuente(this.data.idPregunta, this.obtenerDatos())
        .subscribe(result => {
          this.hideLoading();
          Utils.showToast('Se actualizó correctamente la pregunta', this.toastrService);
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

  private obtenerDatos(): Pregunta {
    const pregunta = new Pregunta();
    pregunta.descripcion = this.myForm.getRawValue().descripcion;
    pregunta.idEstado = this.myForm.getRawValue().estado ? 1 : 0;
    pregunta.orden = this.orden;
    return pregunta;
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

}
