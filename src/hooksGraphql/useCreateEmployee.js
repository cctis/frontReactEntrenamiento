import {useMutation, gql } from '@apollo/client'

const SET_CREATEEMPLOYEE = gql`
mutation createEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
    id
    dateEntry
    documentTypeId
    document
    name
    surname
    gender
    birthPlace
    birthDate 
    programmingLanguages{
      id
      name
    }
  }
}
`
export const useCreateEmployee = ( 

input
) => {
    console.log("hook create")
    
    const[createEmployee,{data,loading,error}]= useMutation(SET_CREATEEMPLOYEE,{
      variables:{
        input
      }
  })

  
  return [
    createEmployee
  ]
}
