import React, { useState } from 'react'
import { ModalGeneral } from './ModalGeneral'
import ListaEmpleadosV2 from './ListaEmpleadosV2';
import { FormularioV2 } from './FormularioV2';

const Main = () => {

    const [openModal, setOpenModal] = useState(false)


    const [empleados, setEmpleados] = useState([]);
    const [empleado, setEmpleado] = useState({});

    const eliminarEmpleado = (idEmpleado) => {
        const newEmpleados = [...empleados]
        const empleadosActualizados = newEmpleados.findIndex(empleado => empleado.idEmpleado === idEmpleado);

        newEmpleados.splice(empleadosActualizados, 1)

        setEmpleados(newEmpleados)
    }

    const handleEdit = (values) => {
        setEmpleado(values);

        setOpenModal(true)
    }

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha
    }

    const handleSubmit = (values) => {

        console.log('values= ', values)

        const { idEmpleado } = values || {};

        if (idEmpleado) {
            //editando el registro

            const empleadosActualizados = empleados.map(empleadoState => empleadoState.idEmpleado === empleado.idEmpleado ? values : empleadoState)

            setEmpleados(empleadosActualizados)
            setEmpleado({})

        } else {
            //nuevo registro
            setEmpleados([...empleados, { ...values, idEmpleado: generarId() }])
        }

        setOpenModal(false)

    }

    return (

        <div>
            <div className="flex justify-center mt-5">
                <button type="button" className="text-center py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg " onClick={() => { setOpenModal(openModal => !openModal) }}>Crear empleado</button>
            </div>


            <div className='flex justify-center mt-7'>
                <ListaEmpleadosV2
                    empleados={empleados}
                    handleEdit={handleEdit}
                    eliminarEmpleado={eliminarEmpleado}
                ></ListaEmpleadosV2>
            </div>

            {openModal && (
                <FormularioV2
                    empleado={empleado}
                    handleClose={() => { setOpenModal(false) }}
                    handleSubmit={handleSubmit}
                >

                </FormularioV2>
            )}

        </div>
    )
}

export default Main