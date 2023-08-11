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
    const [error, setError] = useState(false)

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
        setError(false)
        setIsModalOpen(true);

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

        handleSubmit(empleadoBuscado)
        console.log('values= ', empleadoBuscado)
        setIsModalOpen(true)
    }

    const handleView = (values) => {

        setIdEmpl(values.id)

        if (datosEmpleado === undefined) return console.log('cargando...')

        const empleadoBuscado = datosEmpleado.employee

      
        console.log("empleado buscado", empleadoBuscado)
        setMeta(empleadoBuscado)
        setComponentButtonDisabled(true)
        setCompoDisabled(true)
        setIsModalOpen(true)


    }

    const handleEliminar = (values) => {

        setIdEmpl(values.id)



        const empleadoBuscado = datosEmpleado.employee

        console.log("empleado buscado", empleadoBuscado.id)

        const respuesta = confirm(`desea eliminar el id ${empleadoBuscado.id} empleado?`)




        if (respuesta) {

            deleteEmployee(empleadoBuscado.id)

        }
    }


    const handleSubmit = (values) => {

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
                           
                            programmingLanguages:{
                                id
                              }
                              }
                    }
                })
            } catch (error) {
                console.log(error)
            }


        } else {
            //nuevo registro


            console.log("estoy en crear", values)

            const documentTypeIdAsNumber = parseInt(documentTypeId, 10);
            const documentAsNumber = parseInt(document, 10);
           

            try {
                
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
            } catch (error) {
                console.log(error)
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

                ></FormularioV2>
            </Modal>
        </div>
    )
}

export default Main