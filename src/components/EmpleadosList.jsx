import { useEffect, useState } from "react"
import { getAllEmpleados,  } from "../helpers"
import { Empleado } from "./Empleado"
import { Paginacion } from "./Paginacion";

export const EmpleadosList = ({empleados,setEmpleado,eliminarEmpleado,setEmpleados}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(3);

   // const empleadoCognox = getAllEmpleados()

 
  
        
  // Lógica para la paginación
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = empleados.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const sortedEmpleados = [...currentEmployees].sort(
      (a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso)
    );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

  return (
  

    <>
      

    <table className="table" id="table1">
          <thead>
            <tr>

            <th>Nombres y Apellidos</th>

            <th>N. Documento</th>

            <th>Fecha ingreso</th>

            <th>Lenguajes</th>

            <th>Estado</th>

            <th>Acciones</th>
            </tr>
          </thead>
          
          <tbody>


          {
            sortedEmpleados.map( (empleado) =>(

               <Empleado key={empleado.idEmpleado} empleado={empleado} setEmpleado={setEmpleado} eliminarEmpleado={eliminarEmpleado}></Empleado>
  
            ))
        }
           
          </tbody>

          <Paginacion
        employeesPerPage={employeesPerPage}
        totalEmployees={empleados.length}
        paginate={paginate}
      />
        </table>
    </>
  )
}
