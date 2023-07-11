import { empleados } from "../data/empleados";

export const getEmpleadoById = (idEmpleado) =>{
    return empleados.filter( empleado => empleado.idEmpleado === idEmpleado)
}