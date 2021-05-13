import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargoService } from 'src/app/services/cargo.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Cargo } from 'src/app/shared/models/cargo';

@Component({
  selector: 'app-deletar-cargo',
  templateUrl: './deletar-cargo.component.html',
  styleUrls: ['./deletar-cargo.component.scss']
})
export class DeletarCargoComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Ativar/Desativar Cargo';
  tituloBotaoAdicionar = 'Retornar Cargos';
  urlAdicionar = '/cargo';
  formulario!: FormGroup;
  cargo!: Cargo;
  constructor(
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.cargoService.getCargoData() === undefined) {
      this.formulario = this.cargoService.criarFormulario(false);
      let id = this.route.snapshot.params['id'];
      this.sub = this.cargoService
        .carregarPorId(id)
        .subscribe((cargo) => {
          this.cargoService.setCargoData(cargo);
          this.formulario = this.cargoService.criarFormulario(false);
          this.cargo = this.formulario.value;
        });
    } else {
      this.formulario = this.cargoService.criarFormulario(false);
    }
    let ativo = this.cargoService.getCargoData().ativo;
  }
  Submit() {
    const config = {
      data: {
        descricao: 'Deseja ativar/desativar cargo selecionada?',
        titulo: 'Cargo selecionada',
        btnSucesso: 'Ativar/Desativar a cargo',
        btnCancelar: 'Voltar a tela do formulário',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    this.sub = dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.cargoService
          .ativardesativar(this.cargoService.getCargoData())
          .subscribe(() => {
            this.snack.showMessage('Salvo com sucesso!', 'verde');
            this.router.navigateByUrl('cargo');
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
