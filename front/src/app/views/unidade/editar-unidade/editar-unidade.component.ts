import { MatDialog } from '@angular/material/dialog';
import { UnidadeService } from 'src/app/services/unidade.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-unidade',
  templateUrl: './editar-unidade.component.html',
  styleUrls: ['./editar-unidade.component.scss'],
})
export class EditarUnidadeComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  titulo = 'Editar Unidade';
  tituloBotaoAdicionar = 'Retornar Unidades';
  urlAdicionar = '/unidade';
  
  formulario!: FormGroup;
  constructor(
    private unidadeService: UnidadeService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
    ) {}
    
    ngOnInit(): void {
      if (this.unidadeService.getUnidadeData() === undefined) {
        this.formulario = this.unidadeService.criarFormulario(true);
        let id = this.route.snapshot.params['id'];
        this.sub = this.unidadeService.carregarPorId(id).subscribe((unidade) => {
          this.unidadeService.setUnidadeData(unidade);
          this.formulario = this.unidadeService.criarFormulario(true);
        });
      }
      else{
        this.formulario = this.unidadeService.criarFormulario(true);
      }
    }
    Submit() {
      const config = {
        data: {
          btnSucesso: "Editar a unidade",
          btnCancelar: "Voltar a tela de edição",
          corBtnCancelar: "primary",
          possuirBtnFechar: true
        } as Alerta 
      }; 
      const dialogRef = this.dialog.open(AlertaComponent, config);
      this.sub =  dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao){
          this.unidadeService.atualizar(this.formulario.value).subscribe(() => {
            this.snack.showMessage('Alterado com sucesso!', 'verde');
            this.router.navigateByUrl('unidade');
          });
        }
      });
    }
    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
  }
  