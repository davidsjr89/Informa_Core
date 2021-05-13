import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Modalidade } from 'src/app/shared/models/modalidade';

@Component({
  selector: 'app-deletar-modalidade',
  templateUrl: './deletar-modalidade.component.html',
  styleUrls: ['./deletar-modalidade.component.scss'],
})
export class DeletarModalidadeComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Ativar/Desativar Modalidade';
  tituloBotaoAdicionar = 'Retornar Modalidades';
  urlAdicionar = '/modalidade';
  formulario!: FormGroup;
  modalidade!: Modalidade;
  constructor(
    private modalidadeService: ModalidadeService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.modalidadeService.getModalidadeData() === undefined) {
      this.formulario = this.modalidadeService.criarFormulario(false);
      let id = this.route.snapshot.params['id'];
      this.sub = this.modalidadeService
        .carregarPorId(id)
        .subscribe((modalidade) => {
          this.modalidadeService.setModalidadeData(modalidade);
          this.formulario = this.modalidadeService.criarFormulario(false);
          this.modalidade = this.formulario.value;
        });
    } else {
      this.formulario = this.modalidadeService.criarFormulario(false);
    }
    let ativo = this.modalidadeService.getModalidadeData().ativo;
  }
  Submit() {
    const config = {
      data: {
        descricao: 'Deseja ativar/desativar modalidade selecionada?',
        titulo: 'Modalidade selecionada',
        btnSucesso: 'Ativar/Desativar a modalidade',
        btnCancelar: 'Voltar a tela do formulário',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    this.sub = dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.modalidadeService
          .ativardesativar(this.modalidadeService.getModalidadeData())
          .subscribe(() => {
            this.snack.showMessage('Salvo com sucesso!', 'verde');
            this.router.navigateByUrl('modalidade');
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
