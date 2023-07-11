import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Formulario } from '../pages/Formulario'
import { FormularioV2 } from './FormularioV2'



export function ModalGeneral ({children,setOpenModal,empleados,setEmpleados,empleado,setEmpleado}) {


  const ocultarModal = () => {
    setOpenModal(false)
    // setTimeout(() => {
    //   setOpenModal(false)
    // }, 500);

}
  return createPortal(
    <div className='modal'>
        {children}

        {/* <div className="cerrar-modal">
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div> */}

        
        <div className="contenedorFormulario">
        <FormularioV2 
        empleado={empleado}
        empleados={empleados}
        setEmpleado={setEmpleado}
        setEmpleados={setEmpleados}
        
        ></FormularioV2>

        </div>
        
    </div>,
    document.body
  )
}

