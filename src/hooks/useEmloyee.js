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
    const {data,error,loading}= useQuery(GET_EMPLOYEE,{
        variables:{
            id
        }
    })

    return{
        data,
        error,
        loading
    }
}