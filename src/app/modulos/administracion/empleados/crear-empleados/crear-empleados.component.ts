import { Component, Input, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit {

  empleados: Empleado[];
  empleadosForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {
    this.empleados = [];
    this.empleadosForm = this.fb.group({
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
     
  }

  get f() { return this.empleadosForm.controls; }

  onSubmit(empleado: Empleado, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.empleadosForm.invalid) {
        return;
    }

    this.add(empleado);

    setTimeout(() => {
      formDirective.resetForm();
      this.empleadosForm.reset()
    }, 0);

    this.router.navigate(['/administracion/buscarEmpleado'])
  }

  add(empleado: Empleado): void {
    if (!empleado) { return; }

    empleado.FechaNacimiento = new Date(empleado.FechaNacimiento);

    if (empleado.EsCliente == true) {
      empleado.EsCliente = true;
      empleado.EsDirectivo = false
    } else {
      empleado.EsCliente = false;
      empleado.EsDirectivo = true
    }

    this.empleadoService.addEmpleado(empleado)
      .subscribe(empleado => {
        this.empleados.push(empleado);
        alert("Empleado creado correctamente")
      }, (error: any) => {
        alert("Error almacenando el empleado")
      });
  }

}

