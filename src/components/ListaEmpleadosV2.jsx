import React, { useState } from 'react'
import { Empleado } from "./Empleado"



 const ListaEmpleadosV2 = ({empleados,eliminarEmpleado, handleEdit,handleView}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(3);
  
   
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
        
  
      <table className="table-auto border border-separate  border-spacing-10" id="table1">
            <thead className='font-black text-4m text-center'>
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
  
                 <Empleado key={empleado.idEmpleado} empleado={empleado}  eliminarEmpleado={eliminarEmpleado} handleEdit={handleEdit} handleView={handleView}></Empleado>
    
              ))
          }
             
            </tbody>
  
            {/* <Paginacion
          employeesPerPage={employeesPerPage}
          totalEmployees={empleados.length}
          paginate={paginate}
        /> */}
          </table>
      </>
    )
  }
  
export default ListaEmpleadosV2;