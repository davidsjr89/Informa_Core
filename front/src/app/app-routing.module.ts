import { Colaborador } from './shared/models/colaborador';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './views/home/principal/principal.component';
import { AutenticacaoComponent } from './shared/layout/autenticacao/autenticacao.component';
import { HomeComponent } from './shared/layout/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full'},
      { path: 'principal', component: PrincipalComponent},
      { path: 'unidade', loadChildren: () =>(import('./views/unidade/unidade.module').then(u => u.UnidadeModule))},
      { path: 'modalidade', loadChildren: () => (import('./views/modalidade/modalidade.module').then(m => m.ModalidadeModule))},
      { path: 'cargo', loadChildren: () => (import('./views/cargo/cargo.module').then(m => m.CargoModule))},
      { path: 'colaborador', loadChildren: () => (import('./views/colaborador/colaborador.module').then(m => m.ColaboradorModule))},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AutenticacaoComponent,
    loadChildren: () => import('./views/usuario/usuario.module').then( u => u.UsuarioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
