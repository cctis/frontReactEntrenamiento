import { EmpleadosList } from "../components/empleadosList"
import { FormularioEmpleado } from "../components/formularioEmpleado"
import { useEffect, useState } from 'react';

export const Formulario = () => {

  const [empleados,setEmpleados]= useState([]);
  const [empleado,setEmpleado]=useState({});

  // const eliminarEmpleado = (idEmpleado) => {
  //   const newEmpleados = [...empleados]
  //   const empleadosActualizados = newEmpleados.findIndex(empleado => empleado.idEmpleado === idEmpleado );

  //   newEmpleados.splice(empleadosActualizados,1)

  //   setEmpleados(newEmpleados)
  // }

  
  return (
    <>

    <div className="contenedorFormulario">
      <div className='formularioEmpleado'>
        <FormularioEmpleado empleados={empleados} setEmpleados={setEmpleados} empleado={empleado} setEmpleado={setEmpleado}
        ></FormularioEmpleado>
        
        </div>
    
        {/* <div className="listaEmpleado">
        <EmpleadosList 
        empleados={empleados}
        setEmpleado={setEmpleado}
        setEmpleados={setEmpleados}
        eliminarEmpleado={eliminarEmpleado}
        ></EmpleadosList>
        </div> */}
    </div>
  
      
    
    </>
  )
}
