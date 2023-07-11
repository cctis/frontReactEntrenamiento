import React from 'react'

export const Paginacion = ({ employeesPerPage, totalEmployees, paginate }) => {
    const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button onClick={() => paginate(number)}>{number}</button>
        </li>
      ))}
    </ul>
  );
}

