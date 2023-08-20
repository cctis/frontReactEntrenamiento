import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { Pagination } from 'antd';
import { LoadingOutlined,EyeOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { useEmployees } from '../hooksGraphql/useEmployees';

const { Column} = Table;

export default function TablaEmpleados({ handleEdit, handleView,handleEliminar }) {

  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('descend');
  const {error,loading,data}=useEmployees(currentPage);


  if (loading) return <div><LoadingOutlined /></div>
  if (error) return <div>error...{error.message}</div>

  return (

    <div>

      <Table dataSource={data.employees.data.map((dato) => {
        return { ...dato }

      })} pagination={false} >


        <Column title="Nombres y Apellidos" key={data.name}
          render={(name) =>
            <>
              {name.name + " " + name.surname}

            </>
          }
          
        />

        <Column title="Numero de documento" dataIndex="document" key="document" />
        <Column
          title="Fecha de ingreso"
          dataIndex="dateEntry"
          key="dateEntry"
          sortOrder={sortOrder}
          sorter={(a, b) => 
            (sortOrder === 'descend' ? a.dateEntry.localeCompare(b.dateEntry) 
            : b.dateEntry.localeCompare(a.dateEntry))}
        />

        <Column
          title="Lenguajes"
          dataIndex="programmingLanguages"
          key="programmingLanguages"
          render={(programmingLanguages) => (
            <>
              {programmingLanguages.map((programmingLanguage,index) => (
              
              //  <>
                //    {programmingLanguage.name + ","}
                // </>

                //console.log(programmingLanguage.name)
                <>
                  <Tag color="blue" key={index}>
                    {programmingLanguage.name}

                  </Tag>

                </>

              ))}
            </>
          )}
        />

        <Column title="Estado" dataIndex="programmingLanguages" key="programmingLanguages"
          render={(programmingLanguages) => (
            <>
              {programmingLanguages.map((programmingLanguage) => (
                <span key={programmingLanguage.id}>
                  {programmingLanguage.active ? 'activo' + ' ' : 'inactivo'}

                </span>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, empleado) => (
            <Space size="middle">
              <EyeOutlined onClick={() => handleView(empleado)}/>
              <EditOutlined onClick={() => handleEdit(empleado)} />
              <DeleteOutlined onClick={() => handleEliminar(empleado)} />
              </Space>
          )}
        />

      </Table>

      <Pagination defaultCurrent={currentPage} total={500} onChange={(newPage) => {setCurrentPage(newPage)}} />
    </div>

  );
}