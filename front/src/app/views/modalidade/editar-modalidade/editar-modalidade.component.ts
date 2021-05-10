import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadeService } from 'src/app/services/modalidade.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'app-editar-modalidade',
  templateUrl: './editar-modalidade.component.html',
  styleUrls: ['./editar-modalidade.component.scss'],
})
export class EditarModalidadeComponent implements OnInit {
  titulo = 'Editar Modalidade';
  tituloBotaoAdicionar = 'Retornar Modalidade';
  urlAdicionar = '/modalidade';

  formulario!: FormGroup;
  constructor(
    private modalidadeService: ModalidadeService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.modalidadeService.getModalidadeData() === undefined) {
      this.formulario = this.modalidadeService.criarFormulario(true);
      let id = this.route.snapshot.params['id'];
      this.modalidadeService.carregarPorId(id).subscribe((modalidade) => {
        this.modalidadeService.setModalidadeData(modalidade);
        this.formulario = this.modalidadeService.criarFormulario(true);
      });
    } else {
      this.formulario = this.modalidadeService.criarFormulario(true);
    }
  }
  Submit() {
    const config = {
      data: {
        btnSucesso: 'Editar a modalidade',
        btnCancelar: 'Voltar a tela de edição',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.modalidadeService.atualizar(this.formulario.value).subscribe(
          () => {
            this.snack.showMessage('Alterado com sucesso!', 'verde');
            this.router.navigateByUrl('modalidade');
          },
          (error) => {
            this.router.navigateByUrl("modalidade")
            this.snack.showMessage('Já existe item', 'vermelho');
          }
        );
      }
    });
  }
}
