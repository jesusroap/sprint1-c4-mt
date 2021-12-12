export interface Empleado {
    id: string;
    Nombres: string;
    Apellidos: string;
    Telefono: string;
    Direccion: string;
    Email: string;
    Edad: string;
    FechaNacimiento: Date;
    Sueldo: number;
    EsDirectivo: boolean | null;
    EsCliente: boolean | null;
    empresaId: string
}