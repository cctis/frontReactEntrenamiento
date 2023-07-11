import React, { createContext, useState } from "react";

const Contexto = createContext();

function Provider({children}) {

    const [openModal,setOpenModal] = useState(false)

    return (
        <Contexto.Provider value={{openModal,setOpenModal}}>
            {children}
        </Contexto.Provider>
    );
}

export {Contexto,Provider}