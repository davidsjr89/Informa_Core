import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-modalidade',
  templateUrl: './formulario-modalidade.component.html',
  styleUrls: ['./formulario-modalidade.component.scss']
})
export class FormularioModalidadeComponent implements OnInit {
  @Input() Formulario!: FormGroup;
  tipo = "number";
  constructor() { }

  ngOnInit(): void {
  }

}
