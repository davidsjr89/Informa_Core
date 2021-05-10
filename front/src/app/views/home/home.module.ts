import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';

import { PrincipalComponent } from './principal/principal.component';



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    PrincipalComponent
  ]
})
export class HomeModule { }
