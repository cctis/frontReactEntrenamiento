import React, { useEffect, useState } from 'react'
import { Error } from "./Error"
import CerrarBtn from '../img/cerrar.svg'

export const FormularioV2 = ({ empleado, handleSubmit, handleClose }) => {

    const { idEmpleado } = empleado || {};


    const [meta, setMeta] = useState({
        fechaIngreso: '',
        tipoDocumento: '',
        documento: '',
        nombres: '',
        apellidos: '',
        genero: '',
        lugarNacimiento: '',
        fechaNacimiento: '',
        estado: '',
        lenguajeProgramacion: '',
    });


    const handleMeta = (param) => setMeta((_meta) => ({ ..._meta, ...param }));

    const {
        fechaIngreso,
        tipoDocumento,
        documento,
        nombres,
        apellidos,
        genero,
        lugarNacimiento,
        fechaNacimiento,
        estado,
        lenguajeProgramacion } = meta
    const [error, setError] = useState(false)

    useEffect(() => {
        if (Object.keys(empleado).length > 0) {
            handleMeta({ ...empleado })
        }
    }, [empleado])



    const onSubmit = (e) => {
        e.preventDefault();

        //validacion del formulario

        if (Object.values(meta).includes('')) {
            console.log('hay un campo vacio')

            setError(true);
            return;
        }

        setError(false);
        handleSubmit(meta);


    }

    return (
        <div className='modal'>

            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={handleClose}
                />
            </div>

            <div className="contenedorFormulario">

                <form onSubmit={onSubmit} className='formularioEmpleado'>
                    <h1>Formulario de Empleado</h1>
                    {error && <Error mensaje={'todos los campos son obligatorios'} />}

                    <label htmlFor="idEmpleado">ID Empleado:</label>
                    <input type="text" id='idEmpleado' readOnly />

                    <label htmlFor="fechaIngreso">Fecha de ingreso:</label>
                    <input type="date" id='fechaIngreso' value={fechaIngreso} onChange={(event) => { handleMeta({ fechaIngreso: event.target.value }) }} />

                    <label htmlFor="tipoDocumento">Tipo de documento:</label>
                    <select id="tipoDocumento" value={tipoDocumento} onChange={(event) => { handleMeta({ tipoDocumento: event.target.value }) }}>
                        <option value="">Seleccionar tipo</option>
                        <option value="cedula">Cédula de ciudadanía</option>
                        <option value="pasaporte">Pasaporte</option>
                    </select>

                    <label htmlFor="documento">Número de documento:</label>
                    <input type="text" id='documento' value={documento} onChange={(event) => { handleMeta({ documento: event.target.value }) }} />

                    <label htmlFor="nombres">Nombres:</label>
                    <input type="text" id='nombres' value={nombres} onChange={(event) => { handleMeta({ nombres: event.target.value }) }} />

                    <label htmlFor="apellidos">Apellidos:</label>
                    <input type="text" id='apellidos' value={apellidos} onChange={(event) => { handleMeta({ apellidos: event.target.value }) }} />


                    <label htmlFor="genero">Género:</label>
                    <select name="genero" id="genero" value={genero} onChange={(event) => { handleMeta({ genero: event.target.value }) }}>
                        <option value="">Seleccionar género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>

                    <label htmlFor="lugarNacimiento">Lugar de nacimiento:</label>
                    <input type="text" id='lugarNacimiento' value={lugarNacimiento} onChange={(event) => { handleMeta({ lugarNacimiento: event.target.value }) }} />

                    <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                    <input type="date" id='fechaNacimiento' value={fechaNacimiento} onChange={(event) => { handleMeta({ fechaNacimiento: event.target.value }) }} />

                    <label htmlFor="estado">Estado:</label>
                    <select name="estado" id="estado" value={estado} onChange={(event) => { handleMeta({ estado: event.target.value }) }}>
                        <option value="">Seleccionar estado</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="licencia">En licencia</option>
                    </select>

                    <label htmlFor="lenguajeProgramacion">Lenguaje de programación:</label>
                    <select name="lenguajeProgramacion" id="lenguajeProgramacion" value={lenguajeProgramacion} onChange={(event) => { handleMeta({ lenguajeProgramacion: event.target.value }) }}>
                        <option value="">Seleccionar lenguaje</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>

                    <input type="submit" value={empleado.idEmpleado ? 'Editar Empleado' : 'Crear Empleado'} />
                </form>

            </div>
        </div>
    )
}
