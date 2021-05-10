import { SnackBarService } from './../../../services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-adicionar-unidade',
  templateUrl: './adicionar-unidade.component.html',
  styleUrls: ['./adicionar-unidade.component.scss'],
})
export class AdicionarUnidadeComponent implements OnInit {
  titulo = 'Cadastrar uma nova unidade';
  tipo = 'number';
  tituloBotaoAdicionar = 'Retorna Unidades';
  tituloBotaoRetornar = 'Retornar a Tela Principal';

  urlRetornar = '/principal';
  urlAdicionar = '/unidade/';
  formulario!: FormGroup;
  constructor(
    private unidadeService: UnidadeService,
    private router: Router,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.formulario = this.unidadeService.criarFormulario(true);
  }

    Submit() {
    this.unidadeService.adicionar(this.formulario.value).subscribe(() => {
      this.snack.showMessage('Salvo com sucesso!', 'verde');
      this.router.navigateByUrl('unidade');
    }),
    () => {
      this.snack.showMessage('Deu erro tente novamente mais tarde.', 'vermelho');
    }
  }
}
