import React from 'react'
import { Button} from 'antd';



export const Boton = ({ onSubmit, componentButtonDisabled }) => {


    return (
        <>
            <Button type="primary" htmlType="submit" onClick={onSubmit} disabled={componentButtonDisabled}>
                 Aceptar
            </Button>

        </>

    )
}