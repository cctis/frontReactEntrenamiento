import { Button, Modal } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { EmpleadosList } from '../components/empleadosList';
import { useContext, useState } from 'react';
import { Contexto } from '../helpers/contexto';
import { ModalGeneral } from '../components/ModalGeneral';


export const Home = () => {

  const [empleados,setEmpleados]= useState([]);
  const [empleado,setEmpleado]=useState({});
  // const {openModal,setOpenModal}= useContext(Contexto);
  const [openModal,setOpenModal] = useState(false)

  const navigate = useNavigate();

  const onCreate= () =>{
    setOpenModal(true)
    // navigate('/form')
  }

  const toma1Valor = (valor) => {
    //video 73 para comunicar del hijo al padre
  }

  const eliminarEmpleado = (idEmpleado) => {
    const newEmpleados = [...empleados]
    const empleadosActualizados = newEmpleados.findIndex(empleado => empleado.idEmpleado === idEmpleado );

    newEmpleados.splice(empleadosActualizados,1)

    setEmpleados(newEmpleados)
  }
  
  return (
    <>

      {/* <Contexto.Consumer> */}
        {openModal && (
                <ModalGeneral >
                    
                </ModalGeneral>
              )}

         {/* </Contexto.Consumer> */}
    
    <div className="burbuja">
        <div className="contenedor">En este módulo podrá gestionar el registro de los empleados de la empresa.
        <br />
        
        <Button type="link" block  className='botonLink' >
             {/* <NavLink className="general nav-item nav-link" to="/form" > Crear empleado </NavLink> */}
             <div onClick={()=> {setOpenModal(openModal => !openModal )}}>Crear empleado</div>
        </Button>
        
        </div>
  
    </div>
   

    <div className="listaEmpleado">
        <EmpleadosList 
        empleados={empleados}
        setEmpleado={setEmpleado}
        setEmpleados={setEmpleados}
        eliminarEmpleado={eliminarEmpleado}
        ></EmpleadosList>
    </div>
            
          
    </>
    
  )
}
