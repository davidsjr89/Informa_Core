import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/shared/models/cargo';

@Component({
  selector: 'app-mostrar-cargo',
  templateUrl: './mostrar-cargo.component.html',
  styleUrls: ['./mostrar-cargo.component.scss']
})
export class MostrarCargoComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Apresentação das Cargos';
  tituloBotaoAdicionar = 'Cadastrar Cargo';
  urlAdicionar = '/cargo/adicionar';

  listaCargo!: Cargo[];
  formulario!: FormGroup;

  displayedColumns: string[] = ['nome', 'descricao', 'ativo', 'edicao'];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private cargoService: CargoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.cargoService
      .carregarTodos()
      .subscribe((cargo) => {
        this.listaCargo = cargo;
        this.dataSource = new MatTableDataSource(this.listaCargo);
      });
  }
  editar(id: number) {
    const cargoPorId = this.listaCargo.find((x) => x.id === id);
    this.cargoService.setCargoData(cargoPorId as Cargo);
    this.router.navigateByUrl(`cargo/editar/${id}`);
  }

  deletar(id: number) {
    const cargoPorId = this.listaCargo.find((x) => x.id === id);
    this.cargoService.setCargoData(cargoPorId as Cargo);
    this.router.navigateByUrl(`cargo/deletar/${id}`);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
