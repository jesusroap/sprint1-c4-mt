import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-editar-empleados',
  templateUrl: './editar-empleados.component.html',
  styleUrls: ['./editar-empleados.component.css']
})
export class EditarEmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  empleadosForm: FormGroup;
  submitted = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.empleadosForm = this.fb.group({
      id: ['', Validators.required],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Telefono: ['', Validators.required],
      Direccion: ['', Validators.required],
      Edad: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Sueldo: ['', Validators.required],
      EsCliente: ['', Validators.required],
      empresaId: ['', Validators.required],
    }); 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarEmpleado();
  }

  BuscarEmpleado() {
    this.empleadoService.getEmpleadoPorId(this.id).subscribe((datos: Empleado) => {
      this.empleadosForm.controls["id"].setValue(this.id);
      this.empleadosForm.controls["Nombres"].setValue(datos.Nombres);
      this.empleadosForm.controls["Apellidos"].setValue(datos.Apellidos);
      this.empleadosForm.controls["Email"].setValue(datos.Email);
      this.empleadosForm.controls["Telefono"].setValue(datos.Telefono);
      this.empleadosForm.controls["Direccion"].setValue(datos.Direccion);
      this.empleadosForm.controls["Edad"].setValue(datos.Edad);
      const currentDate = new Date(datos.FechaNacimiento).toISOString().substring(0, 10);
      this.empleadosForm.controls["FechaNacimiento"].setValue(currentDate);
      this.empleadosForm.controls["Sueldo"].setValue(datos.Sueldo);
      this.empleadosForm.controls["EsCliente"].setValue(datos.EsCliente);
      this.empleadosForm.controls["empresaId"].setValue(datos.empresaId);
    })
  }

  get f() { return this.empleadosForm.controls; }

  onSubmit(empleado: Empleado, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.empleadosForm.invalid) {
        return;
    }

    this.update(empleado);

    setTimeout(() => {
      formDirective.resetForm();
      this.empleadosForm.reset()
    }, 0);

    this.router.navigate(['/administracion/buscarEmpleado'])
  }

  update(empleado: Empleado): void {
    if (!empleado) { return; }

    empleado.FechaNacimiento = new Date(empleado.FechaNacimiento);

    if (this.empleadosForm.controls["EsCliente"].value == 'true') {
      empleado.EsCliente = true;
      empleado.EsDirectivo = false
    } else if (this.empleadosForm.controls["EsCliente"].value == 'false') {
      empleado.EsCliente = false;
      empleado.EsDirectivo = true
    } else {
      empleado.EsCliente = this.empleadosForm.controls["EsCliente"].value;
      empleado.EsDirectivo = !this.empleadosForm.controls["EsCliente"].value
    }

    this.empleadoService.updateEmpleado(empleado)
      .subscribe(empleado => {
        this.empleados.push(empleado);
        alert("Empleado actualizado correctamente")
      }, (error: any) => {
        alert("Error almacenando el empleado")
      });
  }

}
