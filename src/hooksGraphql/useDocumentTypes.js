import {useQuery, gql } from '@apollo/client'

const GET_DOCUMENTTYPES = gql`
query {
    documentTypes{
        id
        name
    }
    }
`

export const useDocumentTypes = () => {
    const {error,loading,data}= useQuery(GET_DOCUMENTTYPES);

    return{
        error,
        loading,
        data
    }
   
}