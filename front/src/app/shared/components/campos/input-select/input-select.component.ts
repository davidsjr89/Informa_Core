import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from 'src/app/services/validar-campos.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
  @Input() opcoes!: Array<any>;
  @Input() titulo!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  constructor(public validacao: ValidarCamposService) { }

  public get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
