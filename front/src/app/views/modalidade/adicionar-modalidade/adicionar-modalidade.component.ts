import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-adicionar-modalidade',
  templateUrl: './adicionar-modalidade.component.html',
  styleUrls: ['./adicionar-modalidade.component.scss'],
})
export class AdicionarModalidadeComponent implements OnInit {
  titulo = 'Cadastrar uma nova modalidade';
  tipo = 'number';
  tituloBotaoAdicionar = 'Retorna Modalidades';
  tituloBotaoRetornar = 'Retornar a Tela Principal';

  urlRetornar = '/principal';
  urlAdicionar = '/modalidade/';
  formulario!: FormGroup;

  constructor(
    private modalidadeService: ModalidadeService,
    private router: Router,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.formulario = this.modalidadeService.criarFormulario(true);
  }

  Submit() {
    this.modalidadeService.adicionar(this.formulario.value).subscribe(
      () => {
        this.snack.showMessage('Salvo com sucesso', 'verde');
        this.router.navigateByUrl('modalidade');
      },
      (error) => {
        this.formulario.reset();
        this.snack.showMessage('Já existe item', 'vermelho');
      }
    );
  }
}
