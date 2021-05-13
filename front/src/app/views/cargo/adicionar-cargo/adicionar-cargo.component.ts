import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargoService } from 'src/app/services/cargo.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-adicionar-cargo',
  templateUrl: './adicionar-cargo.component.html',
  styleUrls: ['./adicionar-cargo.component.scss']
})
export class AdicionarCargoComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Cadastrar um novo cargo';
  tipo = 'number';
  tituloBotaoAdicionar = 'Retorna Cargos';
  tituloBotaoRetornar = 'Retornar a Tela Principal';

  urlRetornar = '/principal';
  urlAdicionar = '/cargo/';
  formulario!: FormGroup;

  constructor(
    private cargoService: CargoService,
    private router: Router,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.formulario = this.cargoService.criarFormulario(true);
  }

  Submit() {
    this.sub = this.cargoService
      .adicionar(this.formulario.value)
      .subscribe(
        () => {
          this.snack.showMessage('Salvo com sucesso', 'verde');
          this.router.navigateByUrl('cargo');
        },
        (error) => {
          this.formulario.reset();
          this.snack.showMessage('Já existe item', 'vermelho');
        }
      );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
