import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog'
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ComponentsModule } from './../../shared/components/components.module';
import { MostrarUnidadeComponent } from './mostrar-unidade/mostrar-unidade.component';
import { AdicionarUnidadeComponent } from './adicionar-unidade/adicionar-unidade.component';
import { FormularioUnidadeComponent } from './formulario-unidade/formulario-unidade.component';
import { EditarUnidadeComponent } from './editar-unidade/editar-unidade.component';
import { DeletarUnidadeComponent } from './deletar-unidade/deletar-unidade.component';

const routes: Routes = [
  {path: '', redirectTo: 'mostrar', pathMatch: 'full'},
  {path: 'mostrar', component: MostrarUnidadeComponent},
  {path: 'adicionar', component: AdicionarUnidadeComponent},
  {path: 'editar/:id', component: EditarUnidadeComponent},
  {path: 'deletar/:id', component: DeletarUnidadeComponent},
]

@NgModule({
  declarations: [
    AdicionarUnidadeComponent,
    MostrarUnidadeComponent,
    FormularioUnidadeComponent,
    EditarUnidadeComponent,
    DeletarUnidadeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    AdicionarUnidadeComponent
  ]
})
export class UnidadeModule { }
