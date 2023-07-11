import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';

// import './styless.css'
import './stylessV2.css'
import { GestionEmpleadosApp } from './GestionEmpleadosApp';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
       <GestionEmpleadosApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
