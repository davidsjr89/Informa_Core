import { ModalidadeModule } from './../../views/modalidade/modalidade.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


import { UnidadeModule } from './../../views/unidade/unidade.module';
import { ComponentsModule } from './../components/components.module';
import { HomeComponent } from './home/home.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { TopoComponent } from './topo/topo.component';



@NgModule({
  declarations: [
    HomeComponent,
    AutenticacaoComponent,
    TopoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    UnidadeModule,
    ModalidadeModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    AutenticacaoComponent,
    HomeComponent,
  ]
})
export class LayoutModule { }
