import { Router } from '@angular/router';
import { UnidadeService } from 'src/app/services/unidade.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Unidade } from 'src/app/shared/models/unidade';

@Component({
  selector: 'app-mostrar-unidade',
  templateUrl: './mostrar-unidade.component.html',
  styleUrls: ['./mostrar-unidade.component.scss'],
})
export class MostrarUnidadeComponent implements OnInit {
  titulo = 'Apresentação das Unidades';
  tituloBotaoAdicionar = 'Cadastrar Unidade';
  urlAdicionar = '/unidade/adicionar';

  listaUnidade!: Unidade[];
  displayedColumns: string[] = [
    'nome',
    'endereco',
    'telefone',
    'cidade',
    'ativo',
    'edicao',
  ];

  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private unidadeService: UnidadeService, private router: Router) {}

  ngOnInit(): void {
    this.unidadeService.carregartodos().subscribe((unidade) => {
      this.listaUnidade = unidade;
      this.dataSource = new MatTableDataSource(this.listaUnidade);
    });
  }

  editar(id: number) {
    const unidadePorId = this.listaUnidade.find((x) => x.id === id);
    this.unidadeService.setUnidadeData(unidadePorId as Unidade);
    this.router.navigateByUrl(`unidade/editar/${id}`);
  }

  deletar(id: number) {
    const unidadePorId = this.listaUnidade.find((x) => x.id === id);
    this.unidadeService.setUnidadeData(unidadePorId as Unidade);
    this.router.navigateByUrl(`unidade/deletar/${id}`);
  }
}
