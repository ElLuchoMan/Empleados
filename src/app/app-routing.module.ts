import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';


const routes: Routes = [
  {path:'',redirectTo:'listarEmpleados',pathMatch:'full'},
  {path: 'listarEmpleados', component: ListEmpleadosComponent},
  {path: 'crearEmpleados', component: CreateEmpleadosComponent},
  {path: 'editarEmpleados/:id', component: CreateEmpleadosComponent},
  {path:'**',redirectTo:'listarEmpleados',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
