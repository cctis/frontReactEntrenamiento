import React, {  useState } from 'react'
import { Error } from "./Error"
import {Form,Input,Select,Button,Tag} from 'antd';
import { useDocumentTypes } from '../hooksGraphql/useDocumentTypes';
import { useProgrammingLanguages } from '../hooksGraphql/useProgrammingLanguages';
import { number } from 'yup';
import { CrearLenguajes } from './CrearLenguajes';
import { MostrarLenguajes } from './MostrarLenguajes';
import { EdadAntiguedad } from './EdadAntiguedad';
import { Boton } from './Boton';

export const FormularioV2 = ({ compoDisabledDocument,setCompoDisabledDocument,boton,setBoton,aniosLaborados,edad,setEdad,stateEdadAntiguedad,setStateEdadAntiguedad,setStateLenguajeShow,stateLenguajeShow,stateLenguaje,setStateLenguaje, handleSubmit,setMeta, meta,handleCancel,componentButtonDisabled,componentDisabled,compoDisabled,setError,error}) => {

    const { id } = meta || {};
    
    const { data } = useDocumentTypes();
    const { datosLenguajes } = useProgrammingLanguages();
    
    const [errorEdad, setErrorEdad] = useState(false);
    const [errorLenguajes, setErrorLenguajes] = useState(false)
    const [errorLenguajesMasculino,setErrorLenguajesMasculino]= useState(false)

    
    

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
        
    
        const handleMeta = (param) => {
           
            setMeta((_meta) => ({ ..._meta, ...param }));

        };
        

    const onSubmit = (e) => {
        e.preventDefault();

        
       const { dateEntry,
        documentTypeId,
        document,
        name,
        surname,
        gender,
        birthPlace,
        birthDate,
        programmingLanguages 
    } = meta;

         // validacion del formulario

        
       if(dateEntry === '' || documentTypeId === ''|| document === '' || name === '' || surname === '' || gender === '' || birthPlace === ''|| birthDate ==='' || programmingLanguages===''){
        setError(true);

            setTimeout(() => {
                 setError(false);
             }, 10000);
            
             return;
       }


     // Calcula la edad basada en la fecha de nacimiento
         
        if (birthDate) {
                const newbirthDate = new Date(birthDate);
                const today = new Date();
                const age = today.getFullYear() - newbirthDate.getFullYear();

            if(age < 18){
                
                    window.alert(`la edad es ${age} `);
                 

                    setErrorEdad(true);

                    setTimeout(() => {
                        setErrorEdad(false);
                    }, 10000);
                    
                    return;

            }

            
            setEdad(age);

            if(age >25){
                if (!programmingLanguages || programmingLanguages.length < 2) {
                    // Manejo de error por falta de lenguajes de programación
                    setErrorLenguajes(true);
            
                    setTimeout(() => {
                        setErrorLenguajes(false);
                    }, 10000);
            
                    return;
            }

            }

        }
      
        if (gender === "M" && programmingLanguages) {
            const invalidLanguages = programmingLanguages.filter(
              (languageId) =>
                !datosLenguajes.programmingLanguages.find(
                  (lenguaje) =>
                    lenguaje.id === languageId && lenguaje.name.toLowerCase().includes("a")
                )
            );
      
            if (invalidLanguages.length > 0) {
                setErrorLenguajesMasculino(true);
      
              setTimeout(() => {
                setErrorLenguajesMasculino(false);
              }, 10000);
      
              return;
            }
        }
        
        setError(false);
        setErrorLenguajes(false);
        setErrorEdad(false);
        setErrorLenguajesMasculino(false);

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
                            
                            <Input disabled={componentDisabled} value={id} style={{width: 35}}/>
                     </Form.Item>

                    <label htmlFor="fechaIngreso">Fecha de ingreso:</label>
                    <input type="date" id='dateEntry' value={dateEntry} disabled={compoDisabled} onChange={(event) => { handleMeta({ dateEntry: event.target.value }) }} />

                        <Form.Item label="Tipo de documento" required>
                        <Select id='documentTypeId' value={documentTypeId} onChange={(value) => handleFormChange('documentTypeId', value)} placeholder="Selecciona un tipo de documento" style={{width: 200}} disabled={compoDisabled}>
                        {data && (data.documentTypes || []).map((tipo) => (
                            <Select.Option key={tipo.id} value={tipo.id}>
                            {tipo.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </Form.Item>

              
                    <label htmlFor="documento">Número de documento:</label>
                    <input type="text" id='document' value={document} disabled={compoDisabledDocument} onChange={(event) => { handleMeta({ document: event.target.value }) }} />

                    <label htmlFor="nombres">Nombres:</label>
                    <input type="text" id='nombre' value={name} disabled={compoDisabled} onChange={(event) => { handleMeta({ name: event.target.value }) }} />

                    <label htmlFor="apellidos">Apellidos:</label>
                    <input type="text" id='surname' value={surname} disabled={compoDisabled} onChange={(event) => { handleMeta({ surname: event.target.value }) }} />

                            
                    <label htmlFor="genero">Género:</label>
                    <select  value={gender} disabled={compoDisabled} onChange={(event) => { handleMeta({ gender: event.target.value }) }} style={{width: 375}}>
                        <option value="">Seleccionar género</option>
                        <option value="M"  >M</option>
                        <option value="F" >F</option>
                    </select>

                   
                    <label htmlFor="lugarNacimiento">Lugar de nacimiento:</label>
                    <input type="text" id='birthPlace'disabled={compoDisabled} value={birthPlace} onChange={(event) => { handleMeta({ birthPlace: event.target.value }) }}  />

                    <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                    <input type="date" id='birthDate'disabled={compoDisabled} value={birthDate} onChange={(event) => { handleMeta({ birthDate: event.target.value }) }} />
                    {errorEdad && <Error mensaje={'es menor de edad'} />}
                
                    {stateLenguaje && <CrearLenguajes meta={meta} datosLenguajes={datosLenguajes} compoDisabled={compoDisabled} handleFormChange={handleFormChange}/>}
                     {stateLenguajeShow && <MostrarLenguajes meta={meta} datosLenguajes={datosLenguajes} componentButtonDisabled={componentButtonDisabled} handleFormChange={handleFormChange} />}
                      
                    {errorLenguajes && <Error mensaje={'debe tener minimo dos lenguajes por ser mayor de 25 años'} />}
                    {errorLenguajesMasculino && <Error mensaje={'empleado es hombre solo debe tener leguajes de programación que contengan la letra “a”'} />}

                    {stateEdadAntiguedad && <EdadAntiguedad edad={edad} aniosLaborados={aniosLaborados} compoDisabled={compoDisabled} />}

                    <Form.Item >
                    {boton && <Boton onSubmit={onSubmit} componentButtonDisabled={componentButtonDisabled}  />}
                            <Button htmlType="button" onClick={handleCancel} >
                            Cancelar
                            </Button>
                            
                    </Form.Item>
                </Form>

            </div>
        
    )
}
