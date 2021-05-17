import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarColaboradorComponent } from './adicionar-colaborador/adicionar-colaborador.component';
import { EditarColaboradorComponent } from './editar-colaborador/editar-colaborador.component';
import { DeletarColaboradorComponent } from './deletar-colaborador/deletar-colaborador.component';
import { MostrarColaboradorComponent } from './mostrar-colaborador/mostrar-colaborador.component';
import { FormularioColaboradorComponent } from './formulario-colaborador/formulario-colaborador.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ComponentsModule } from 'src/app/shared/components/components.module';

const routes: Routes = [
  {path: '', redirectTo: 'mostrar', pathMatch: 'full'},
  {path: 'mostrar',  component: MostrarColaboradorComponent},
  {path: 'adicionar',  component: AdicionarColaboradorComponent},
  {path: 'editar/:id',  component: EditarColaboradorComponent},
  {path: 'deletar/:id',  component: DeletarColaboradorComponent},
]


@NgModule({
  declarations: [
    AdicionarColaboradorComponent,
    EditarColaboradorComponent,
    DeletarColaboradorComponent,
    MostrarColaboradorComponent,
    FormularioColaboradorComponent
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
    MatCheckboxModule,
    MatDatepickerModule,
  ],
})
export class ColaboradorModule { }
