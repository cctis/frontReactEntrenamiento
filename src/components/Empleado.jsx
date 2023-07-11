import React from 'react'

export const Empleado = ({empleado, handleEdit,eliminarEmpleado}) => {

    // const [openModal,setOpenModal] = useState(false)

    const handleEliminar= () => {
        const respuesta = confirm('deseas eliminar este empleado?')

        if(respuesta){
            eliminarEmpleado(empleado.idEmpleado)
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
            <button type='button' >Visualizar</button>
            {/* <button type='button' onClick={ () => setEmpleado(empleado) }>Editar</button> */}
            <button type='button' onClick={() =>  handleEdit(empleado)}>Editar</button>
            <button type='button' onClick={ handleEliminar}>Eliminar</button>
        </td>
    </tr>
    
    </>
  )
}

