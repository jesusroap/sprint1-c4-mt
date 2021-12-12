import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Empleado } from '../modelos/empleado.modelo';
import { SeguridadService } from './seguridad.service';


@Injectable({ providedIn: 'root' })
export class EmpleadoService {

  token: string = '';
  private empleadosUrl = "http://localhost:3000/empleados";  // URL to web api

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
  }

  /** GET heroes from the server */
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.empleadosUrl, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  getEmpleadoPorId(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(this.empleadosUrl + `/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.empleadosUrl, empleado, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.patch<Empleado>(this.empleadosUrl + `/${empleado.id}`, empleado, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  deleteEmpleado(id: string): Observable<any> {
    return this.http.delete(this.empleadosUrl + `/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}


