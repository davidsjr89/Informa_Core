import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { Colaborador } from 'src/app/shared/models/colaborador';

@Component({
  selector: 'app-mostrar-colaborador',
  templateUrl: './mostrar-colaborador.component.html',
  styleUrls: ['./mostrar-colaborador.component.scss']
})
export class MostrarColaboradorComponent implements OnInit {

  sub!: Subscription;
  titulo = 'Apresentação das Colaboradores';
  tituloBotaoAdicionar = 'Cadastrar Colaborador';
  urlAdicionar = '/colaborador/adicionar';

  listaColaborador!: Colaborador[];
  formulario!: FormGroup;

  displayedColumns: string[] = ['nome', 'dataNascimento', 'email', 'telefone', 'endereco', 'cargo', 'ativo', 'edicao'];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.colaboradorService
      .carregarTodos()
      .subscribe((colaborador) => {
        this.listaColaborador = colaborador;
        this.dataSource = new MatTableDataSource(this.listaColaborador);
      });
  }
  editar(id: number) {
    const colaboradorPorId = this.listaColaborador.find((x) => x.id === id);
    this.colaboradorService.setColaboradorData(colaboradorPorId as Colaborador);
    this.router.navigateByUrl(`colaborador/editar/${id}`);
  }

  deletar(id: number) {
    const colaboradorPorId = this.listaColaborador.find((x) => x.id === id);
    this.colaboradorService.setColaboradorData(colaboradorPorId as Colaborador);
    this.router.navigateByUrl(`colaborador/deletar/${id}`);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
