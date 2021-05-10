import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from 'src/app/services/validar-campos.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent{

  @Input() controlName!: string;
  @Input() titulo!: string;
  @Input() formGroup!: FormGroup;
  constructor( public validacao: ValidarCamposService) { }

 get formControl(): AbstractControl{
   return this.formGroup.controls[this.controlName];
 }
}
