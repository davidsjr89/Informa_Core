import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Node } from '../../models/node';
@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss'],
})
export class TopoComponent implements OnInit {
  @ViewChild('sidenav', { static: false })
  sidenav!: MatSidenav;
  tree_cadastro!: Node[];
  tree_matricula!: Node[];
  tree_financeiro!: Node[];
  tree_relatorio!: Node[];
  tree_usuario!: Node[];
  constructor() {}

  ngOnInit(): void {
    this.tree_cadastro = [
      {
        name: 'Cadastro',
        children: [
          { name: 'Unidade' },
          { name: 'Modalidade' },
          { name: 'Cargo'  },
          { name: 'Colaborador' },
          { name: 'Turma' },
          { name: 'Aulas' },
        ],
      },
    ];
    this.tree_matricula = [
      {
        name: 'Matricula',
        children: [{ name: 'Matrículas'}],
      },
    ];
    this.tree_financeiro = [
      {
        name: 'Financeiro',
        children: [{ name: 'Mensalidade'},
                   { name: 'Alunos Inadimplentes'}],
      },
    ];
    this.tree_relatorio = [
      {
        name: 'Relatório',
        children: [{ name: 'Relatorios'}],
      },
    ];
    this.tree_usuario = [
      {
        name: 'Usuário',
        children: [{ name: 'Usuários'}],
      },
    ];
  }
  openSideNav() {
    this.sidenav.open();
  }

  closeSideNav() {
    this.sidenav.close();
  }
}
