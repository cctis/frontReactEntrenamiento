import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import './stylessV2.css'
import { GestionEmpleadosApp } from './GestionEmpleadosApp';


const client = new ApolloClient({

  uri: "http://localhost/graphql",

  cache: new InMemoryCache()
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GestionEmpleadosApp />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
