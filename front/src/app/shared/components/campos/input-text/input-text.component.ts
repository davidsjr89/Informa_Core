import { ValidarCamposService } from './../../../../services/validar-campos.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  @Input() controlName!: string;
  @Input() titulo!: string;
  @Input() formGroup!: FormGroup;
  @Input() tipo = 'text'; //pode ser texto simples ou email é só mudar o tipo.
  constructor( public validacao: ValidarCamposService) { }

 get formControl(): AbstractControl{
   return this.formGroup.controls[this.controlName];
 }
}
