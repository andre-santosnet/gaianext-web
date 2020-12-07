import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormularioComponent } from './formulario/formulario.component';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent
  },
  {
    path: 'incluir',
    component: FormularioComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'alterar/:idCliente',
    component: FormularioComponent,
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
