import React from 'react'
import {Form,Select} from 'antd';

export const MostrarLenguajes = ({meta,datosLenguajes,componentButtonDisabled,handleFormChange}) => {
  return (
    <Form.Item
          label="Lenguaje de programación:"
          rules={[{ required: true, message: 'seleccione el lenguaje de programación', type: 'array', },]}
      >
          <Select disabled={componentButtonDisabled} mode="multiple" placeholder="Lenguaje de programación" value={meta && (meta.programmingLanguages || []).map((lenguajes) => { return lenguajes.name })} onChange={(value) => handleFormChange('programmingLanguages', value)} style={{ width: 190 }}>
              {datosLenguajes && (datosLenguajes.programmingLanguages || []).map((lenguajes) => {
                  return (
                      <Select.Option value={lenguajes.name} key={lenguajes.id}>{lenguajes.name}</Select.Option>
                  )
              })}
          </Select>
    </Form.Item>
  )
}