import React from 'react'
import {Form,Select} from 'antd';

export const CrearLenguajes = ({meta,datosLenguajes,compoDisabled,handleFormChange}) => {
  return (
    <Form.Item name="lenguajes" label="Lenguaje de programación" rules={[{ required: true, message: 'Selecciona al menos un lenguaje' }]}>
          <Select id='programmingLanguages' value={(meta.programmingLanguages || []).map(item => item.name)}

              onChange={(value) => handleFormChange('programmingLanguages', value)} mode="multiple" style={{ width: 190 }} disabled={compoDisabled} >
              {datosLenguajes && (datosLenguajes.programmingLanguages || []).map(lenguaje => (
                  <Select.Option key={lenguaje.id} value={lenguaje.id} >
                      {lenguaje.name}
                  </Select.Option>
              ))}
          </Select>
    </Form.Item> 
  )
}