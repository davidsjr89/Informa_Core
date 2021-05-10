import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';

import { InputTextComponent } from './campos/input-text/input-text.component';
import { InputDateComponent } from './campos/input-date/input-date.component';
import { InputSelectComponent } from './campos/input-select/input-select.component';
import { InputTextareaComponent } from './campos/input-textarea/input-textarea.component';
import { ArvoreSelecaoComponent } from './arvore-selecao/arvore-selecao.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { InputNumberComponent } from './campos/input-number/input-number.component';
import { AlertaComponent } from './alerta/alerta.component';



@NgModule({
  declarations: [
    InputTextComponent,
    InputDateComponent,
    InputSelectComponent,
    InputTextareaComponent,
    ArvoreSelecaoComponent,
    CabecalhoComponent,
    InputNumberComponent,
    AlertaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule
  ],
  exports: [
    InputTextComponent,
    InputDateComponent,
    InputSelectComponent,
    InputTextareaComponent,
    ArvoreSelecaoComponent,
    CabecalhoComponent,
   ],
})
export class ComponentsModule { }
