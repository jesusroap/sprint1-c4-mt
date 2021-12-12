import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from "crypto-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {
  submitted = false;

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'clave': ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.fgValidador.controls; }

  onSubmit(datos: string): void {
    this.submitted = true;

    if (this.fgValidador.invalid) {
        return;
    }
    this.IdentificarUsuario();
    // console.log(datos);

    // this.add(empleado);
    // console.log(empleado);
    // setTimeout(() => {
    //   formDirective.resetForm();
    //   this.empleadosForm.reset()
    // }, 0);
  }

  IdentificarUsuario() {
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    // let claveCifrada = cryptoJS.MD5(clave).toString();
    
    this.servicioSeguridad.Identificar(usuario, clave).subscribe((datos: any) => {
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(['/inicio']);
    }, (error: any) => {
      alert("Datos invalidos")
    });
  }

}
