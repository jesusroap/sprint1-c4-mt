import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { BuscarEmpleadosComponent } from './empleados/buscar-empleados/buscar-empleados.component';
import { CrearEmpleadosComponent } from './empleados/crear-empleados/crear-empleados.component';
import { EditarEmpleadosComponent } from './empleados/editar-empleados/editar-empleados.component';
import { EliminarEmpleadosComponent } from './empleados/eliminar-empleados/eliminar-empleados.component';
import { ListarEmpleadosComponent } from './empleados/listar-empleados/listar-empleados.component';

const routes: Routes = [
  {
    path: 'crearEmpleado',
    component: CrearEmpleadosComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editarEmpleado/:id',
    component: EditarEmpleadosComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminarEmpleado',
    component: EliminarEmpleadosComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'buscarEmpleado',
    component: BuscarEmpleadosComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listarEmpleados',
    component: ListarEmpleadosComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
