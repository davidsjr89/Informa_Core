import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargoService } from 'src/app/services/cargo.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.component.html',
  styleUrls: ['./editar-cargo.component.scss']
})
export class EditarCargoComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Editar Cargo';
  tituloBotaoAdicionar = 'Retornar Cargo';
  urlAdicionar = '/cargo';

  formulario!: FormGroup;
  constructor(
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.cargoService.getCargoData() === undefined) {
      this.formulario = this.cargoService.criarFormulario(true);
      let id = this.route.snapshot.params['id'];
      this.sub = this.cargoService
        .carregarPorId(id)
        .subscribe((cargo) => {
          this.cargoService.setCargoData(cargo);
          this.formulario = this.cargoService.criarFormulario(true);
        });
    } else {
      this.formulario = this.cargoService.criarFormulario(true);
    }
  }
  Submit() {
    const config = {
      data: {
        btnSucesso: 'Editar a cargo',
        btnCancelar: 'Voltar a tela de edição',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    this.sub = dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.cargoService.atualizar(this.formulario.value).subscribe(
          () => {
            this.snack.showMessage('Alterado com sucesso!', 'verde');
            this.router.navigateByUrl('cargo');
          },
          (error) => {
            this.router.navigateByUrl('cargo');
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
