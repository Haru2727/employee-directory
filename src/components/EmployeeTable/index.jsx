import React from "react";
import "./style.css"

// creating the employee table and learned how to use the table with github and w3schools
// <thead> allows to group the header <tr> defines the row <th> defines the cells in the table
// using this syntax you can use scope="col" to put it into columns
const EmployeeTable = (props) => {
  return (
    <table className="table table-striped table-sortable text-center">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col" data-field="name" data-sortable="true">
            <span onClick={() => props.sortBy("name", "last", "first")}>
              Name
            </span>
          </th>
          <th scope="col">
            <span onClick={() => props.sortBy("phone")}>Phone</span>
          </th>
          <th scope="col">
            <span onClick={() => props.sortBy("email")}>Email</span>
          </th>
          <th scope="col">
            <span onClick={() => props.sortBy("dob", "date")}>DOB</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.state.searchFilter.map((employee) => {
          const { first, last } = employee.name;
          const fullName = `${first} ${last}`;

          
          const dob = props.formatDate(employee.dob.date);

          return (
            <tr key={employee.login.uuid}>
              <td>
                <img src={employee.picture.thumbnail} alt={fullName} />
              </td>
              <td className="align-middle">{fullName}</td>
              <td className="align-middle">
              <a href={`tel:+1${employee.phone}`}>{employee.phone}</a></td>
              <td className="align-middle email">
                <a href={`mailto:${employee.email}`}>{employee.email}</a>
              </td>
              <td className="align-middle">{dob}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeTable;