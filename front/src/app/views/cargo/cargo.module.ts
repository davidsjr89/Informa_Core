import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarCargoComponent } from './mostrar-cargo/mostrar-cargo.component';
import { DeletarCargoComponent } from './deletar-cargo/deletar-cargo.component';
import { EditarCargoComponent } from './editar-cargo/editar-cargo.component';
import { FormularioCargoComponent } from './formulario-cargo/formulario-cargo.component';
import { AdicionarCargoComponent } from './adicionar-cargo/adicionar-cargo.component';
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
import { ComponentsModule } from 'src/app/shared/components/components.module';

const routes: Routes = [
  {path: '', redirectTo: 'mostrar', pathMatch: 'full'},
  {path: 'mostrar',  component: MostrarCargoComponent},
  {path: 'adicionar',  component: AdicionarCargoComponent},
  {path: 'editar/:id',  component: EditarCargoComponent},
  {path: 'deletar/:id',  component: DeletarCargoComponent},
]

@NgModule({
  declarations: [
    MostrarCargoComponent,
    DeletarCargoComponent,
    EditarCargoComponent,
    FormularioCargoComponent,
    AdicionarCargoComponent
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
  
})
export class CargoModule { }
