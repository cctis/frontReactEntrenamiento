import React, { useState } from 'react'
import TablaEmpleados from './TablaEmpleados';
import { Button, DatePicker, Form, Input, Select, Modal } from 'antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { FormularioV2 } from './FormularioV2';
import { useEmployee } from '../hooksGraphql/useEmloyee';
import { LoadingOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteEmployee } from '../hooksGraphql/useDeleteEmployee';
import { useCreateEmployee } from '../hooksGraphql/useCreateEmployee';
import { useUpdateEmployee } from '../hooksGraphql/useUpdateEmployee';


// dayjs.extend(customParseFormat);

// const dateFormat = 'YYYY-MM-DD';

//   const tailLayout = {
//      wrapperCol: {
//       offset: 8,
//       span: 16,
//     },
//   };

const Main = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [componentButtonDisabled, setComponentButtonDisabled] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [compoDisabled, setCompoDisabled] = useState(false);
    const [compoDisabledDocument,setCompoDisabledDocument]=useState(false);
    const [error, setError] = useState(false)
    const [edad, setEdad] = useState('');
    const [aniosLaborados, setAniosLaborados] = useState('');
    const [boton, setBoton] = useState(false);

    const [stateLenguaje, setStateLenguaje] = useState(false)
    const [stateLenguajeShow, setStateLenguajeShow] = useState(false)
    const [stateEdadAntiguedad, setStateEdadAntiguedad] = useState(false)

    const [empleado, setEmpleado] = useState({});
    const [empleados, setEmpleados] = useState([]);

    const [idEmpl, setIdEmpl] = useState();
    const { datosEmpleado, errorEmpleado, cargaEmpleado } = useEmployee(idEmpl);
    const [deleteEmployee] = useDeleteEmployee(idEmpl)

    const [createEmployee] = useCreateEmployee()
    const [updateEmployee] = useUpdateEmployee()

    const [meta, setMeta] = useState({
        id: '',
        dateEntry: '',
        documentTypeId: '',
        document: '',
        name: '',
        surname: '',
        gender: '',
        birthPlace: '',
        birthDate: '',
        created_at: '',
        updated_at: '',
        programmingLanguages: [],
    });

    if (cargaEmpleado) return <div><LoadingOutlined /></div>
  

    const showModal = () => {

        setMeta({
            id: '',
            dateEntry: '',
            documentTypeId: '',
            document: '',
            name: '',
            surname: '',
            gender: '',
            birthPlace: '',
            birthDate: '',
            created_at: '',
            updated_at: '',
            programmingLanguages: [],
        });
        setComponentButtonDisabled(false)
        setCompoDisabled(false)
        setCompoDisabledDocument(false)
        setError(false)
        setBoton(true)
        setIsModalOpen(true);
        setStateEdadAntiguedad(false)
        setStateLenguajeShow(false)
        setAniosLaborados(false)
        setStateLenguaje(true)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleEdit = (values) => {


        setIdEmpl(values.id)
        const empleadoBuscado = datosEmpleado.employee

        setMeta(empleadoBuscado)
        setComponentButtonDisabled(false);
        setCompoDisabled(false)
        setCompoDisabledDocument(true)
        setStateLenguajeShow(false)
        setStateLenguaje(true)
        console.log('values= ', empleadoBuscado)
        setStateEdadAntiguedad(false)
        setAniosLaborados(false)
        setBoton(true)
        handleSubmit(empleadoBuscado)
        setIsModalOpen(true)
    }

    const handleView = (values) => {

        setIdEmpl(values.id)

        
        const empleadoBuscado = datosEmpleado.employee

        const newbirthDate = new Date(values.birthDate);
        const today = new Date();
        const age = today.getFullYear() - newbirthDate.getFullYear();

        setEdad(age)

        const newdataEntry = new Date(values.dateEntry);
        const hoy = new Date();
        const antiguedad = hoy.getFullYear() - newdataEntry.getFullYear();

        setAniosLaborados(antiguedad)
      
        console.log("empleado buscado", empleadoBuscado)
        setMeta(empleadoBuscado)
        setComponentButtonDisabled(true)
        setCompoDisabled(true)
        setCompoDisabledDocument(true)
        setStateLenguajeShow(true)
        setStateLenguaje(false)
        setStateEdadAntiguedad(true)
        setBoton(false)
        setIsModalOpen(true)

        

    }

    const handleEliminar = (values) => {

        setIdEmpl(values.id)

        const empleadoBuscado = datosEmpleado.employee

        const newdataEntry = new Date(values.dateEntry);
        const hoy = new Date();
        const diferenciaEnMilisegundos = hoy - newdataEntry;
        const milisegundosEnDosDias = 2 * 24 * 60 * 60 * 1000; 


        console.log("empleado buscado", empleadoBuscado.id)

        
        if (diferenciaEnMilisegundos <= milisegundosEnDosDias) {
            const respuesta = window.confirm(`¿Desea eliminar al empleado con ID ${empleadoBuscado.id}?`);
    
            if (respuesta) {
                deleteEmployee(empleadoBuscado.id);
                const mensaje = `Empleado ${empleadoBuscado.id} eliminado exitosamente.`;
                window.alert(mensaje);
            }
        } else {
            const mensaje = `No se puede eliminar al empleado ${empleadoBuscado.id} debido a la antigüedad.`;
            window.alert(mensaje);
        }

    }


    const handleSubmit =  (values) => {

        // console.log('values= ', values)

        const { id, dateEntry,
            documentTypeId,
            document,
            name,
            surname,
            gender,
            birthPlace,
            birthDate,
            programmingLanguages } = values || {};

        if (id) {
            //editando el registro

             
            
            console.log("estoy en editar", values)
            console.log("estoy en EL ID", id)

            const documentTypeIdAsNumber = parseInt(documentTypeId, 10);
            const documentAsNumber = parseInt(document, 10);

            try {

                 setEmpleados(
                    updateEmployee({
                        variables: {
                            id,
                            input: {
                                dateEntry,
                                documentTypeId:documentTypeIdAsNumber,
                                document:documentAsNumber,
                                name,
                                surname,
                                gender,
                                birthPlace,
                                birthDate,
                                programmingLanguages
                                  }
                        }
                    })
                )
                
                //  const mensaje = `Empleado ${id} ${name} ${surname} editado exitosamente.`;
                //  window.alert(mensaje);

            } catch (error) {
                console.log(error)
                
                    const mensaje = `Empleado ${id} ${name} ${surname} NO fue editado presenta el error = ${error}.`;
                    window.alert(mensaje);
            }

            

        } else {
            //nuevo registro


            console.log("estoy en crear", values)

            const documentTypeIdAsNumber = parseInt(documentTypeId, 10);
            const documentAsNumber = parseInt(document, 10);
           

            try {
                
             setEmpleados(
                    createEmployee({
                        variables: {
                            input: {
                                dateEntry,
                                documentTypeId:documentTypeIdAsNumber,
                                document:documentAsNumber,
                                name,
                                surname,
                                gender,
                                birthPlace,
                                birthDate,
                                programmingLanguages
                            }
                        }
                    })
                )
               

                
                    const mensaje = `Empleado ${name} ${surname} creado exitosamente.`;
                    window.alert(mensaje);
                 

            } catch (error) {
                console.log(error)
                
                    const mensaje = `Empleado ${id} ${name} ${surname} NO fue creado presenta el error = ${error}.`;
                    window.alert(mensaje);
                 
            }


        }
        

        setIsModalOpen(false)


    }


    return (

        <div>
            <div className="botonCrearEmpleado">
                <Button type="primary"
                    onClick={showModal}

                >Crear Empleado</Button>
            </div>

            <hr />

            <div >

                <TablaEmpleados
                    handleEdit={handleEdit}
                    handleView={handleView}
                    handleEliminar={handleEliminar}
                ></TablaEmpleados>

            </div>

            <Modal open={isModalOpen}
                title="Formulario empleado"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >


                <FormularioV2
                    meta={meta}
                    handleSubmit={handleSubmit}
                    setMeta={setMeta}
                    handleCancel={handleCancel}
                    componentButtonDisabled={componentButtonDisabled}
                    componentDisabled={componentDisabled}
                    compoDisabled={compoDisabled}
                    setError={setError}
                    error={error}
                    stateLenguaje={stateLenguaje}
                    setStateLenguaje={setStateLenguaje}
                    stateLenguajeShow={stateLenguajeShow}
                    setStateLenguajeShow={setStateLenguajeShow}
                    setStateEdadAntiguedad={setStateEdadAntiguedad}
                    stateEdadAntiguedad={stateEdadAntiguedad}
                    edad={edad}
                    setEdad={setEdad}
                    aniosLaborados={aniosLaborados}
                    boton={boton}
                    setBoton={setBoton}
                    compoDisabledDocument={compoDisabledDocument}
                    setCompoDisabledDocument={setCompoDisabledDocument}
                ></FormularioV2>
            </Modal>
        </div>
    )
}

export default Main