import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        console.log("estoy en el reset")
        setFormState( initialForm );
        console.log(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState
    }
}