import { useQuery, gql } from '@apollo/client'


const GET_EMPLOYEES = gql`
query getEmployees($name:String,$first:Int!,$page:Int!){
  employees(name: $name, first: $first, page: $page) {
    paginatorInfo {
      count
      currentPage
      firstItem
      hasMorePages
      lastItem
      lastPage
      perPage
      total
    }
    data {
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
  }
}

`


export const useEmployees = (currentPage) => {
  console.log("hook employeees")
    const { error, data, loading } = useQuery(GET_EMPLOYEES, { variables: { name: "%%", first: 10, page: currentPage } });

    return{
        error,
        data,
        loading
    }
}