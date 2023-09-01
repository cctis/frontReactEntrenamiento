import React from 'react'
import {Form,Input} from 'antd';



export const EdadAntiguedad = ({edad,compoDisabled,aniosLaborados}) => {


  return (
    <>
       <Form.Item label="Edad del Empleado:" >
              <Input disabled={compoDisabled} value={edad} style={{ width: 240 }} />
          </Form.Item>

          <Form.Item label="Antiguedad del Empleado:" >
              <Input disabled={compoDisabled} value={aniosLaborados} style={{ width: 200 }} />
          </Form.Item>

    </>
    
  )
}