import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificacionPersona(usuario: string, clave: string) {
    try {
      let clave_e = this.CifrarClave(clave);
      let p = this.empleadoRepository.findOne({where: {Email: usuario, Clave: clave_e}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(empleado: Empleado) {
    let token = jwt.sign(
      {
        data: {
          id: empleado.id,
          correo: empleado.Email,
          nombre: empleado.Nombres + " " + empleado.Apellidos
        }
      },
      Llaves.claveJWT
    );
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
