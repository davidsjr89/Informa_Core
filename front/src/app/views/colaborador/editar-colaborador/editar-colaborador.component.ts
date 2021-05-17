import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.scss']
})
export class EditarColaboradorComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Editar Colaborador';
  tituloBotaoAdicionar = 'Retornar Colaborador';
  urlAdicionar = '/colaborador';

  formulario!: FormGroup;
  constructor(
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.colaboradorService.getColaboradorData() === undefined) {
      this.formulario = this.colaboradorService.criarFormulario(true);
      let id = this.route.snapshot.params['id'];
      this.sub = this.colaboradorService
        .carregarPorId(id)
        .subscribe((colaborador) => {
          this.colaboradorService.setColaboradorData(colaborador);
          this.formulario = this.colaboradorService.criarFormulario(true);
        });
    } else {
      this.formulario = this.colaboradorService.criarFormulario(true);
    }
  }
  Submit() {
    const config = {
      data: {
        btnSucesso: 'Editar o colaborador',
        btnCancelar: 'Voltar a tela de edição',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    this.sub = dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        debugger
        this.colaboradorService.atualizar(this.formulario.value).subscribe(
          () => {
            this.snack.showMessage('Alterado com sucesso!', 'verde');
            this.router.navigateByUrl('colaborador');
          },
          (error) => {
            this.router.navigateByUrl('colaborador');
            this.snack.showMessage('Já existe item', 'vermelho');
          }
        );
      }
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
