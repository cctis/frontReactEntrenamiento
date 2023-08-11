import React, {  useState } from 'react'
import { Error } from "./Error"
import {Form,Input,Select,Button} from 'antd';
import { useDocumentTypes } from '../hooksGraphql/useDocumentTypes';
import { useProgrammingLanguages } from '../hooksGraphql/useProgrammingLanguages';

export const FormularioV2 = ({  handleSubmit,setMeta, meta,handleCancel,componentButtonDisabled,componentDisabled,compoDisabled,setError,error}) => {

    const { id } = meta || {};
    
    const { data } = useDocumentTypes();
    const { datosLenguajes } = useProgrammingLanguages();
    

    
    const {
       
        dateEntry,
        documentTypeId,
        document,
        name,
        surname,
        gender,
        birthPlace,
        birthDate,
        programmingLanguages
    } = meta
        
    
  const handleMeta = (param) => setMeta((_meta) => ({ ..._meta, ...param }));
 
 

    const onSubmit = (e) => {
        e.preventDefault();

        
        //validacion del formulario

        // if (Object.values(meta).includes('')) {
        //     console.log('hay un campo vacio')

        //     setError(true);
        //     return;
        // }

        setError(false);
        handleSubmit(meta);


    }

    const handleFormChange = (field, value) => {
        setMeta({ ...meta, [field]: value });
      };

    return (
    

            <div className="contenedorFormulario" >

                <Form onSubmit={onSubmit} className='formularioEmpleado'>
                  
                    {error && <Error mensaje={'todos los campos son obligatorios'} />}

                   
                    <Form.Item label="Id Empleado:" >
                            
                            <Input disabled={componentDisabled} value={id} style={{width: 300}}/>
                     </Form.Item>

                    <label htmlFor="fechaIngreso">Fecha de ingreso:</label>
                    <input type="date" id='dateEntry' value={dateEntry} disabled={compoDisabled} onChange={(event) => { handleMeta({ dateEntry: event.target.value }) }} />

                        <Form.Item label="Tipo de documento" required>
                        <Select id='documentTypeId' onChange={(value) => handleFormChange('documentTypeId', value)} placeholder="Selecciona un tipo de documento" style={{width: 200}} disabled={compoDisabled}>
                        {data && (data.documentTypes || []).map((tipo) => (
                            <Select.Option key={tipo.id} value={tipo.id}>
                            {tipo.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </Form.Item>

                    <label htmlFor="documento">Número de documento:</label>
                    <input type="text" id='document' value={document} disabled={compoDisabled} onChange={(event) => { handleMeta({ document: event.target.value }) }} />

                    <label htmlFor="nombres">Nombres:</label>
                    <input type="text" id='nombre' value={name} disabled={compoDisabled} onChange={(event) => { handleMeta({ name: event.target.value }) }} />

                    <label htmlFor="apellidos">Apellidos:</label>
                    <input type="text" id='surname' value={surname} disabled={compoDisabled} onChange={(event) => { handleMeta({ surname: event.target.value }) }} />

                    <label htmlFor="genero">Género:</label>
                    <select  value={gender} disabled={compoDisabled} onChange={(event) => { handleMeta({ gender: event.target.value }) }}>
                        <option value="">Seleccionar género</option>
                        <option value="M"  >M</option>
                        <option value="F" >F</option>
                    </select>

                   
                    <label htmlFor="lugarNacimiento">Lugar de nacimiento:</label>
                    <input type="text" id='birthPlace'disabled={compoDisabled} value={birthPlace} onChange={(event) => { handleMeta({ birthPlace: event.target.value }) }}  />

                    <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                    <input type="date" id='birthDate'disabled={compoDisabled} value={birthDate} onChange={(event) => { handleMeta({ birthDate: event.target.value }) }} />

                
                    <Form.Item name="lenguajes" label="Lenguaje de programación" rules={[{ required: true, message: 'Selecciona al menos un lenguaje' }]}>
                        <Select id='programmingLanguages' onChange={(value) => handleFormChange('programmingLanguages', value)}  mode="multiple" style={{width: 200}} disabled={compoDisabled} >
                            {datosLenguajes && (datosLenguajes.programmingLanguages || []).map(lenguaje => (
                            <Select.Option key={lenguaje.id} value={lenguaje.id} >
                                {lenguaje.name}
                            </Select.Option>
                            ))}
                        </Select>
                        </Form.Item>
              

                    <Form.Item >
                            <Button type="primary" htmlType="submit" onClick={onSubmit} disabled={componentButtonDisabled}>
                            {id ? 'Editar Empleado' : 'Crear Empleado'}
                            </Button>
                            <Button htmlType="button" onClick={handleCancel} >
                                Regresar
                            </Button>
                            
                        </Form.Item>
                </Form>

            </div>
        
    )
}
