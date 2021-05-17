import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Colaborador } from 'src/app/shared/models/colaborador';

@Component({
  selector: 'app-deletar-colaborador',
  templateUrl: './deletar-colaborador.component.html',
  styleUrls: ['./deletar-colaborador.component.scss']
})
export class DeletarColaboradorComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Ativar/Desativar Colaborador';
  tituloBotaoAdicionar = 'Retornar Colaboradores';
  urlAdicionar = '/colaborador';
  formulario!: FormGroup;
  colaborador!: Colaborador;
  constructor(
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.colaboradorService.getColaboradorData() === undefined) {
      this.formulario = this.colaboradorService.criarFormulario(false);
      let id = this.route.snapshot.params['id'];
      this.sub = this.colaboradorService
        .carregarPorId(id)
        .subscribe((colaborador) => {
          this.colaboradorService.setColaboradorData(colaborador);
          this.formulario = this.colaboradorService.criarFormulario(false);
          this.colaborador = this.formulario.value;
        });
    } else {
      this.formulario = this.colaboradorService.criarFormulario(false);
    }
    let ativo = this.colaboradorService.getColaboradorData().ativo;
  }
  Submit() {
    const config = {
      data: {
        descricao: 'Deseja ativar/desativar colaborador selecionada?',
        titulo: 'Colaborador selecionada',
        btnSucesso: 'Ativar/Desativar a colaborador',
        btnCancelar: 'Voltar a tela do formulário',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    this.sub = dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.colaboradorService
          .ativardesativar(this.colaboradorService.getColaboradorData())
          .subscribe(() => {
            this.snack.showMessage('Salvo com sucesso!', 'verde');
            this.router.navigateByUrl('colaborador');
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
