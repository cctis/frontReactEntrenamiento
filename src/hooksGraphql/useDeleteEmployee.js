import {useMutation, gql } from '@apollo/client'

const SET_DELETEEMPLOYEE = gql`
mutation deleteEmployee($id:ID!){
  deleteEmployee(id: $id){
    message
  }
}
`



export const useDeleteEmployee = (id) => {

    console.log("hook delete")

    const[deleteEmployee,{data,loading,error}]= useMutation(SET_DELETEEMPLOYEE,{
        variables:{
            id
        }
    })

  return [
    deleteEmployee
  ]
}
