import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-buscar-empleados',
  templateUrl: './buscar-empleados.component.html',
  styleUrls: ['./buscar-empleados.component.css']
})
export class BuscarEmpleadosComponent implements OnInit {

  listadoRegistros: Empleado[] = [];

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router
  ) {
   
  }

  ngOnInit():void {
    this.ObtenerListadoEmpleados();
  }

  ObtenerListadoEmpleados(): void {
    this.empleadoServicio.getEmpleados().subscribe((datos: Empleado[]) => {
      this.listadoRegistros = datos;
    });
  }

  EliminarEmpleado(id: string): void {
    this.empleadoServicio.deleteEmpleado(id).subscribe();
    alert("Empleado eliminado correctamente")

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/administracion/buscarEmpleado']));
  }

}
