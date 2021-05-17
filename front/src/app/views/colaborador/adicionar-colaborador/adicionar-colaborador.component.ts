import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Cargo } from 'src/app/shared/models/cargo';

@Component({
  selector: 'app-adicionar-colaborador',
  templateUrl: './adicionar-colaborador.component.html',
  styleUrls: ['./adicionar-colaborador.component.scss']
})
export class AdicionarColaboradorComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Cadastrar um novo colaborador';
  tipo = 'number';
  tituloBotaoAdicionar = 'Retorna Colaboradores';
  tituloBotaoRetornar = 'Retornar a Tela Principal';
  urlRetornar = '/principal';
  urlAdicionar = '/colaborador/';
  formulario!: FormGroup;
  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    
    this.formulario = this.colaboradorService.criarFormulario(true);
  }

  Submit() {
    this.sub = this.colaboradorService
      .adicionar(this.formulario.value)
      .subscribe(
        () => {
          this.snack.showMessage('Salvo com sucesso', 'verde');
          this.router.navigateByUrl('colaborador');
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
