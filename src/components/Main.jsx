import React, { useEffect, useState } from 'react'
import TablaEmpleados from './TablaEmpleados';
import { Error } from "./Error"
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    Modal
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDocumentTypes } from '../hooks/useDocumentTypes';
import { useProgrammingLanguages } from '../hooks/useProgrammingLanguages';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

  const tailLayout = {
     wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

const Main = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [componentButtonDisabled, setComponentButtonDisabled] = useState(false);


    const { data } = useDocumentTypes();
    const { datosLenguajes } = useProgrammingLanguages();

    const [empleado, setEmpleado] = useState({});
    const [empleados, setEmpleados] = useState([]);

    const [error, setError] = useState(false)



    const showModal = () => {


        setIsModalOpen(true);



    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

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


    const handleMeta = (param) => setMeta((_meta) => ({ ..._meta, ...param }));

    const {
        id,
        dateEntry,
        documentTypeId,
        document,
        name: nombre,
        surname,
        gender,
        birthPlace,
        birthDate,
        created_at,
        updated_at,
        programmingLanguages
    } = meta



    useEffect(() => {
        if (Object.keys(empleado).length > 0) {
            handleMeta({ ...empleado })
        }
    }, [empleado])



    const onSubmit = (e) => {
        e.preventDefault();

        // handleSubmit(meta);


    }





    const eliminarEmpleado = (id) => {
        const newEmpleados = [...empleados]
        const empleadosActualizados = newEmpleados.findIndex(empleado => empleado.id === id);

        newEmpleados.splice(empleadosActualizados, 1)

        setEmpleados(newEmpleados)
    }

    const handleEdit = (values) => {

        setMeta(values)
        setComponentButtonDisabled(false);
        setIsModalOpen(true)
        console.log('values= ', values)
    }

    const handleView = (values) => {

        setMeta(values)
        setComponentButtonDisabled(true)
        setIsModalOpen(true)
        console.log('values= ', values)
    }

    const handleEliminar = () => {
        const respuesta = confirm('deseas eliminar este empleado?')

        if (respuesta) {
            eliminarEmpleado(empleado.id)
        }
    }


    const handleSubmit = (values) => {

        // console.log('values= ', values)

        const { id } = values || {};

        if (id) {
            //editando el registro

            const empleadosActualizados = empleados.map(empleadoState => empleadoState.id === empleado.id ? values : empleadoState)

            setEmpleados(empleadosActualizados)
            setEmpleado({})

        } else {
            //nuevo registro
            console.log(values)
            setEmpleados([...empleados, { ...values }])
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
                    eliminarEmpleado={eliminarEmpleado}
                    handleView={handleView}
                    handleEliminar={handleEliminar}
                ></TablaEmpleados>

            </div>


            <Modal open={isModalOpen}
                title="Formulario empleado"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[ ]}
            >

                <>

                    <Form
                        labelCol={{ span: 10, }} wrapperCol={{ span: 18, }} layout="horizontal" style={{ maxWidth: 800, }} autoComplete="off"
                    >

                        <Form.Item label="Id Empleado:" >
                            <Input disabled={componentDisabled} value={id} />
                            {error && <Error mensaje={'todos los campos son obligatorios'} />}
                        </Form.Item>

                        <Form.Item label="Fecha de ingreso:" rules={[
                            {
                                required: true,
                                message: 'seleccione la fecha de ingreso',

                            },
                        ]}>

                            <DatePicker disabled={componentButtonDisabled} value={dayjs(dateEntry, dateFormat)} format={dateFormat} onChange={(event) => { handleMeta({ dateEntry: event.target.value }) }} />
                        </Form.Item>

                        <Form.Item label="Tipo de documento:" rules={[
                            {
                                required: true,
                                message: 'seleccione el Tipo de documento',

                            },
                        ]}>
                            <Select disabled={componentButtonDisabled} value={documentTypeId} onChange={(event) => { handleMeta({ documentTypeId: event.target.value }) }}>

                                {data && (data.documentTypes || []).map((documentType) => {
                                    return (
                                        <Select.Option value={documentType.name} key={documentType.name}>{documentType.name} </Select.Option>
                                    )
                                })}


                            </Select>
                        </Form.Item>

                        <Form.Item label="N. de Documento:" rules={[
                            {
                                required: true,
                                message: 'digite el numero de documento',

                            },
                        ]}>
                            <Input disabled={componentButtonDisabled} value={document} onChange={(event) => { handleMeta({ document: event.target.value }) }} />
                        </Form.Item>

                        <Form.Item label="Nombres:" rules={[
                            {
                                required: true,
                                message: 'digite el nombre',

                            },
                        ]}>
                            <Input disabled={componentButtonDisabled} value={nombre} onChange={(event) => { handleMeta({ name: event.target.value }) }} />
                        </Form.Item>

                        <Form.Item label="Apellidos:" rules={[
                            {
                                required: true,
                                message: 'digite el apellido',

                            },
                        ]}>
                            <Input disabled={componentButtonDisabled} value={surname} onChange={(event) => { handleMeta({ surname: event.target.value }) }} />
                        </Form.Item>

                        <Form.Item label="Género:" rules={[
                            {
                                required: true,
                                message: 'seleccione el genero',

                            },
                        ]}>
                            <Select disabled={componentButtonDisabled} value={gender}>
                                <Select.Option onChange={(event) => { handleMeta({ gender: event.target.value }) }}>M</Select.Option>
                                <Select.Option onChange={(event) => { handleMeta({ gender: event.target.value }) }}>F</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Lugar de nacimiento:" rules={[
                            {
                                required: true,
                                message: 'digite el lugar de nacimiento',

                            },

                        ]}>
                            <Input disabled={componentButtonDisabled} value={birthPlace} onChange={(event) => { handleMeta({ birthPlace: event.target.value }) }} />
                        </Form.Item>

                        <Form.Item label="Fecha de nacimiento:" rules={[
                            {
                                required: true,
                                message: 'seleccione la fecha de nacimiento',

                            },
                        ]}>
                            <DatePicker disabled={componentButtonDisabled} value={dayjs(birthDate, dateFormat)} format={dateFormat} onChange={(event) => { handleMeta({ birthDate: event.target.value }) }} />
                        </Form.Item>

                        <Form.Item

                            label="Lenguaje de programación:"
                            rules={[
                                {
                                    required: true,
                                    message: 'seleccione el lenguaje de programación',
                                    type: 'array',
                                },
                            ]}
                        >

                            <Select disabled={componentButtonDisabled} mode="multiple" placeholder="Lenguaje de programación" value={meta && (meta.programmingLanguages || []).map((lenguajes) => { return lenguajes.name })} onChange={(event) => { handleMeta({ programmingLanguages: event.target.value }) }}>
                                {datosLenguajes && (datosLenguajes.programmingLanguages || []).map((lenguajes) => {
                                    return (
                                        <Select.Option value={lenguajes.name} key={lenguajes.id}>{lenguajes.name}</Select.Option>
                                    )
                                })}

                            </Select>

                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={onSubmit} disabled={componentButtonDisabled}>
                            {id ? 'Editar Empleado' : 'Crear Empleado'}
                            </Button>
                            <Button htmlType="button" onClick={handleCancel} >
                                Regresar
                            </Button>
                            
                        </Form.Item>
                    </Form>
                </>
            </Modal>
        </div>
    )
}

export default Main