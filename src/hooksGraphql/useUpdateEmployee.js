import {useMutation, gql } from '@apollo/client'

const SET_UPDATEEMPLOYEE = gql`
mutation updateEmployee($id:ID!,$input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input){
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
    documentType{
      id
    }
    programmingLanguages{
      id
    }
  }
  }

`
export const useUpdateEmployee = ( id,

input
) => {
    console.log("hook update")

    console.log("este es el id", id)
    
    const[updateEmployee,{data,loading,error}]= useMutation(SET_UPDATEEMPLOYEE,{
      variables:{
        id,
        input
      }
  })

  
  return [
    updateEmployee
  ]
}
