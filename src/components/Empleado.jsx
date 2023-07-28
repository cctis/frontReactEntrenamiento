import React from 'react'

export const Empleado = ({empleado, handleEdit,eliminarEmpleado,handleView}) => {

   
    const handleEliminar= () => {
        const respuesta = confirm('deseas eliminar este empleado?')

        if(respuesta){
            eliminarEmpleado(empleado.id)
        }
    }




  return (
    <>
    <tr >
        <td> { `${empleado.nombres} ${empleado.apellidos}`}</td>
        <td>{empleado.documento}</td>
        <td>{empleado.fechaIngreso}</td>
        <td>{empleado.lenguajeProgramacion}</td>
        <td>{empleado.estado}</td>
        <td>
            <button type='button' onClick={() =>  handleView(empleado)} >Visualizar</button>
            {/* <button type='button' onClick={ () => setEmpleado(empleado) }>Editar</button> */}
            <button type='button' onClick={() =>  handleEdit(empleado)}>Editar</button>
            <button type='button' onClick={ handleEliminar}>Eliminar</button>
        </td>
    </tr>
    
    </>
  )
}

