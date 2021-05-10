import { ValidarCamposService } from './../../../../services/validar-campos.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {
  @Input() formGroup!: FormGroup;
  @Input() titulo!: string;
  @Input() controlName!: string;
  constructor(public validacao: ValidarCamposService) { }

  public get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}
