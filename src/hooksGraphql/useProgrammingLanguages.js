import { useQuery, gql} from '@apollo/client'

const GET_PROGRAMMINGLANGUAGES = gql`
query{
  programmingLanguages{
    id
    name
    active
  }
}
`

export const useProgrammingLanguages = () => {

    const { loading,error,data:datosLenguajes}= useQuery(GET_PROGRAMMINGLANGUAGES);

    return{
        loading,
        error,
        datosLenguajes
        }

}