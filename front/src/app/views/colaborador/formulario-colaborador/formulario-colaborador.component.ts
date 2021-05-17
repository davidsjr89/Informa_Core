import { Cargo } from './../../../shared/models/cargo';
import { CargoService } from 'src/app/services/cargo.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-colaborador',
  templateUrl: './formulario-colaborador.component.html',
  styleUrls: ['./formulario-colaborador.component.scss']
})
export class FormularioColaboradorComponent implements OnInit  {
  @Input() Formulario!: FormGroup;
  tipo = "number";
  dados!: Cargo[];
  constructor(private cargoService: CargoService ) {}
  ngOnInit(): void {
    this.cargoService.carregarTodos().subscribe(listaCargos => {
      this.dados = listaCargos
    });
  }

}