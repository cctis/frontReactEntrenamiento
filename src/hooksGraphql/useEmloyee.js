import { useQuery, gql } from '@apollo/client'


const GET_EMPLOYEE = gql`
query getEmployee($id:ID!){
    employee(id: $id){
    id
    dateEntry
    documentTypeId
    document
    name
    surname
    gender
    birthPlace
    birthDate
    created_at
    updated_at
    programmingLanguages{
      id
      name
      active
    }
    }
}`

export const useEmployee = (id) => {

    console.log("llegue al hook empleado")
    const {data:datosEmpleado,error:errorEmpleado,loading:cargaEmpleado}= useQuery(GET_EMPLOYEE,{
        variables:{
            id
        }
    })

    

    return{
        datosEmpleado,
        errorEmpleado,
        cargaEmpleado
    }
}