import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario-unidade.component.html',
  styleUrls: ['./formulario-unidade.component.scss']
})
export class FormularioUnidadeComponent implements OnInit {
  @Input() Formulario!: FormGroup;
  tipo = "number";
  constructor() { }

  ngOnInit(): void {
  }

}
