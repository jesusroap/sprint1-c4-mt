import { Component, OnInit } from '@angular/core';

import { Empleado } from 'src/app/modelos/empleado.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit {

  empleados: Empleado[];

  constructor(private empleadoService: EmpleadoService) {
    this.empleados = [];
  }

  ngOnInit():void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados()
    .subscribe(empleados => this.empleados = empleados);
  }

}
