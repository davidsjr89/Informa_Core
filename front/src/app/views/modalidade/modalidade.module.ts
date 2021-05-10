import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdicionarModalidadeComponent } from './adicionar-modalidade/adicionar-modalidade.component';
import { DeletarModalidadeComponent } from './deletar-modalidade/deletar-modalidade.component';
import { EditarModalidadeComponent } from './editar-modalidade/editar-modalidade.component';
import { MostrarModalidadeComponent } from './mostrar-modalidade/mostrar-modalidade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormularioModalidadeComponent } from './formulario-modalidade/formulario-modalidade.component';

const routes: Routes = [
  {path: '', redirectTo: 'mostrar', pathMatch: 'full'},
  {path: 'mostrar',  component: MostrarModalidadeComponent},
  {path: 'adicionar',  component: AdicionarModalidadeComponent},
  {path: 'editar/:id',  component: EditarModalidadeComponent},
  {path: 'deletar/:id',  component: DeletarModalidadeComponent},
]

@NgModule({
  declarations: [
    AdicionarModalidadeComponent,
    DeletarModalidadeComponent,
    EditarModalidadeComponent,
    MostrarModalidadeComponent,
    FormularioModalidadeComponent
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
    AdicionarModalidadeComponent
  ]
})
export class ModalidadeModule { }
