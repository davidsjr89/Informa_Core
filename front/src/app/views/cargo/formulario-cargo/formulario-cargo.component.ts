import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-cargo',
  templateUrl: './formulario-cargo.component.html',
  styleUrls: ['./formulario-cargo.component.scss']
})
export class FormularioCargoComponent implements OnInit {
  @Input() Formulario!: FormGroup;
  tipo = "number";
  constructor() { }

  ngOnInit(): void {
  }

}
