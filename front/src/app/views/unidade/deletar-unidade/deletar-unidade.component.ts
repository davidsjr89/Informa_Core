import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UnidadeService } from 'src/app/services/unidade.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { SnackBarService } from './../../../services/snackbar.service';
import { Unidade } from 'src/app/shared/models/unidade';

@Component({
  selector: 'app-deletar-unidade',
  templateUrl: './deletar-unidade.component.html',
  styleUrls: ['./deletar-unidade.component.scss']
})
export class DeletarUnidadeComponent implements OnInit {
  titulo = "Ativar/Desativar Unidade";
  tituloBotaoAdicionar = "Retornar Unidades";
  urlAdicionar = "/unidade";
  formulario!: FormGroup;
  unidade!: Unidade;
  constructor(
    private unidadeService: UnidadeService,
    private route: ActivatedRoute,
    private snack: SnackBarService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.unidadeService.getUnidadeData() === undefined) {
      this.formulario = this.unidadeService.criarFormulario(false);
      let id = this.route.snapshot.params['id'];
      this.unidadeService.carregarPorId(id).subscribe((unidade) => {
        this.unidadeService.setUnidadeData(unidade);
        this.formulario = this.unidadeService.criarFormulario(false);
        this.unidade = this.formulario.value;
      });
    }
    else{
      this.formulario = this.unidadeService.criarFormulario(false);
    }
    let ativo = this.unidadeService.getUnidadeData().ativo;
  }
  Submit() {
    const config = {
      data: {
        descricao: "Deseja ativar/desativar unidade selecionada?",
        titulo: "Unidade selecionada",
        btnSucesso: "Ativar/Desativar a unidade",
        btnCancelar: "Voltar a tela do formulário",
        corBtnCancelar: "primary",
        possuirBtnFechar: true
      } as Alerta 
    }; 
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao){
        this.unidadeService.ativardesativar(this.unidadeService.getUnidadeData()).subscribe(() => {
          this.snack.showMessage('Salvo com sucesso!', 'verde');
          this.router.navigateByUrl('unidade');
        });
      }
    });
  }
}
