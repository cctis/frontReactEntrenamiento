import { useEffect, useState } from "react"
import {Error} from "./Error"

export const FormularioEmpleado = ({empleados,setEmpleados,empleado,setEmpleado}) => {

  const [fechaIngreso,setFechaIngreso]=useState('')
  const [tipoDocumento,setTipoDocumento]=useState('')
  const [documento,setDocumento]=useState('')
  const [nombres,setNombres]=useState('')
  const [apellidos,setApellidos]=useState('')
  const [genero,setGenero]=useState('')
  const [lugarNacimiento,setLugarNacimiento]=useState('')
  const [fechaNacimiento,setFechaNacimiento]=useState('')
  const [estado,setEstado]=useState('')
  const [lenguajeProgramacion,setLenguajeProgramacion]=useState('')


  const [error,setError]=useState(false)

  useEffect(()=>{
      if( Object.keys(empleado).length > 0){
        setFechaIngreso(empleado.fechaIngreso)
        setTipoDocumento(empleado.tipoDocumento)
        setDocumento(empleado.documento)
        setNombres(empleado.nombres)
        setApellidos(empleado.apellidos)
        setGenero(empleado.genero)
        setLugarNacimiento(empleado.lugarNacimiento)
        setFechaNacimiento(empleado.fechaNacimiento)
        setEstado(empleado.estado)
        setLenguajeProgramacion(empleado.lenguajeProgramacion)
      }
  }, [empleado])

  const generarId = () => {
   const random= Math.random().toString(36).substring(2);
   const fecha= Date.now().toString(36);

    return random + fecha
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    //validacion del formulario

    if([fechaIngreso,tipoDocumento,documento,nombres,apellidos,genero,lugarNacimiento,fechaNacimiento,estado,lenguajeProgramacion].includes('')){
      console.log('hay un campo vacio')

      setError(true);
      return;
    }

    setError(false);

    //objeto de empleados
    const objetoEmpleado ={
      
      fechaIngreso,
      tipoDocumento,
      documento,
      nombres,
      apellidos,
      genero,
      lugarNacimiento,
      fechaNacimiento,
      estado,
      lenguajeProgramacion
    }

    if(empleado.idEmpleado){
        //editando el registro
      objetoEmpleado.idEmpleado = empleado.idEmpleado

      const empleadosActualizados = empleados.map(empleadoState => empleadoState.idEmpleado === empleado.idEmpleado ? objetoEmpleado : empleadoState)

      setEmpleados(empleadosActualizados)
      setEmpleado({})

    }else{
        //nuevo registro
        objetoEmpleado.idEmpleado = generarId(),
        setEmpleados([...empleados,objetoEmpleado])
    }

    
    
    //reiniciar el form
    setFechaIngreso('')
    setTipoDocumento('')
    setDocumento('')
    setNombres('')
    setApellidos('')
    setGenero('')
    setLugarNacimiento('')
    setFechaNacimiento('')
    setEstado('')
    setLenguajeProgramacion('')
  }

  return (
    <>

<h1>Formulario de Empleado</h1>

<div>x</div>

<form onSubmit={handleSubmit} >
{error && <Error mensaje={'todos los campos son obligatorios'}/> }

  <label htmlFor="idEmpleado">ID Empleado:</label>
  <input type="text" id='idEmpleado' readOnly/>

  <label htmlFor="fechaIngreso">Fecha de ingreso:</label>
  <input type="date" id='fechaIngreso'  value={fechaIngreso} onChange={(event) =>{ setFechaIngreso(event.target.value)}}/>

  <label htmlFor="tipoDocumento">Tipo de documento:</label>
  <select id="tipoDocumento"  value={tipoDocumento} onChange={(event) =>{ setTipoDocumento(event.target.value)}}>
    <option value="">Seleccionar tipo</option>
    <option value="cedula">Cédula de ciudadanía</option>
    <option value="pasaporte">Pasaporte</option>
  </select>

  <label htmlFor="documento">Número de documento:</label>
  <input type="text" id='documento'   value={documento} onChange={(event) =>{ setDocumento(event.target.value)}}/>

  <label htmlFor="nombres">Nombres:</label>
  <input type="text" id='nombres'  value={nombres} onChange={(event) =>{ setNombres(event.target.value)}}/>

  <label htmlFor="apellidos">Apellidos:</label>
  <input type="text" id='apellidos'  value={apellidos} onChange={(event) =>{ setApellidos(event.target.value)}}/>


  <label htmlFor="genero">Género:</label>
  <select name="genero" id="genero" value={genero} onChange={(event) =>{ setGenero(event.target.value)}}>
    <option value="">Seleccionar género</option>
    <option value="masculino">Masculino</option>
    <option value="femenino">Femenino</option>
  </select>

  <label htmlFor="lugarNacimiento">Lugar de nacimiento:</label>
  <input type="text" id='lugarNacimiento'  value={lugarNacimiento} onChange={(event) =>{ setLugarNacimiento(event.target.value)}}/>

  <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
  <input type="date" id='fechaNacimiento'  value={fechaNacimiento} onChange={(event) =>{ setFechaNacimiento(event.target.value)}} />

  <label htmlFor="estado">Estado:</label>
  <select name="estado" id="estado" value={estado} onChange={(event) =>{ setEstado(event.target.value)}}>
    <option value="">Seleccionar estado</option>
    <option value="activo">Activo</option>
    <option value="inactivo">Inactivo</option>
    <option value="licencia">En licencia</option>
  </select>

  <label htmlFor="lenguajeProgramacion">Lenguaje de programación:</label>
  <select name="lenguajeProgramacion" id="lenguajeProgramacion"  value={lenguajeProgramacion} onChange={(event) =>{ setLenguajeProgramacion(event.target.value)}}>
  <option value="">Seleccionar lenguaje</option>
    <option value="java">Java</option>
    <option value="python">Python</option>
    <option value="javascript">JavaScript</option>
  </select>

<input type="submit" value={empleado.idEmpleado ? 'Editar Empleado': 'Crear Empleado'} />
</form>
    
    </>
  )
}
