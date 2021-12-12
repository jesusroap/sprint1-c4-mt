import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearEmpleadosComponent } from './empleados/crear-empleados/crear-empleados.component';
import { EditarEmpleadosComponent } from './empleados/editar-empleados/editar-empleados.component';
import { EliminarEmpleadosComponent } from './empleados/eliminar-empleados/eliminar-empleados.component';
import { BuscarEmpleadosComponent } from './empleados/buscar-empleados/buscar-empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarEmpleadosComponent } from './empleados/listar-empleados/listar-empleados.component';


@NgModule({
  declarations: [
    CrearEmpleadosComponent,
    EditarEmpleadosComponent,
    EliminarEmpleadosComponent,
    BuscarEmpleadosComponent,
    ListarEmpleadosComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdministracionModule { }
