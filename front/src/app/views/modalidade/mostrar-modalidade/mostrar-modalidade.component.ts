import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Modalidade } from './../../../shared/models/modalidade';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalidadeService } from 'src/app/services/modalidade.service';

@Component({
  selector: 'app-mostrar-modalidade',
  templateUrl: './mostrar-modalidade.component.html',
  styleUrls: ['./mostrar-modalidade.component.scss']
})
export class MostrarModalidadeComponent implements OnInit {
  titulo = "Apresentação das Modalidades"
  tituloBotaoAdicionar = "Cadastrar Modalidade";
  urlAdicionar = '/modalidade/adicionar';
  
  listaModalidade!: Modalidade[];
  formulario!: FormGroup;

  displayedColumns: string[] = [
    'nome',
    'ativo',
    'edicao'
  ];
  dataSource: any;

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( private modalidadeService: ModalidadeService, private router: Router) { }

  ngOnInit(): void {
    this.modalidadeService.carregarTodos().subscribe(modalidade => {
      this.listaModalidade = modalidade;
      this.dataSource = new MatTableDataSource(this.listaModalidade);
    });
  }
  editar(id: number) {
    const modalidadePorId = this.listaModalidade.find((x) => x.id === id);
    this.modalidadeService.setModalidadeData(modalidadePorId as Modalidade);
    this.router.navigateByUrl(`modalidade/editar/${id}`);
  }

  deletar(id: number) {
    const modalidadePorId = this.listaModalidade.find((x) => x.id === id);
    this.modalidadeService.setModalidadeData(modalidadePorId as Modalidade);
    this.router.navigateByUrl(`modalidade/deletar/${id}`);
  }
}
