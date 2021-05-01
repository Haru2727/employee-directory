import React, { Component } from "react";
import SearchBar from "../SearchBar";
import EmployeeTable from "../EmployeeTable";
import API from "../../utils/API";

class EmployeesContainer extends Component {
  state = {
    search: "",
    employees: [],
    searchFilter: [],
    sortDirections: this.sortingBy,
  };

  get sortingBy() {
    return {
      name: "",
      phone: "",
      email: "",
      dob: "",
    };
  }

  // When this component mounts, load random users as employees from https://randomuser.me/
  componentDidMount() {
    API.getEmployees()
      .then((res) =>
        this.setState({
          employees: res.data.results,
          searchFilter: res.data.results,
        })
      )
      .catch((err) => console.log(err));
  }

  // Update search state to filter by employee name
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ search: value });
    this.filterEmployees(value.toLowerCase().trim());
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  // Sort with the key of specified object.
  // If key has children, sort by primary child and optionally a secondary child. i.e. sort by last name, then first.
  sortBy = (key, primary = 0, secondary = 0) => {
    let sortedEmployees = this.state.searchFilter;
    if (this.state.sortDirections[key]) {
      this.setState({
        searchFilter: sortedEmployees.reverse(),
        sortDirections: {
          ...this.sortingBy,
          [key]: this.state.sortDirections[key] === "asc" ? "desc" : "asc",
        },
      });
    } else {
      sortedEmployees = this.state.searchFilter.sort((a, b) => {
        a = a[key];
        b = b[key];

        // If secondary comparison given and primary comparison is equal
        // Example: Sorting by last name, if last names are equal, then sort that instance by first name instead.
        if (primary) {
          if (secondary && a[primary] === b[primary]) {
            return a[secondary].localeCompare(b[secondary]);
          }
          return a[primary].localeCompare(b[primary]);
        } else {
          return a.localeCompare(b);
        }
      });

      this.setState({
        searchFilter: sortedEmployees,
        sortDirections: {
          ...this.sortingBy,
          [key]: "asc",
        },
      });
    }
  };

  filterEmployees = (input) => {
    if (input) {
      this.setState({
        searchFilter: this.state.employees.filter((employee) => {
          return (
            employee.name.first
              .toLowerCase()
              .concat(" ", employee.name.last.toLowerCase())
              .includes(input) ||
            employee.phone.includes(input) ||
            employee.phone.replace(/[^\w\s]/gi, "").includes(input) ||
            employee.email.includes(input) ||
            this.formatDate(employee.dob.date).includes(input)
          );
        }),
      });
    } else {
      this.setState({ searchFilter: this.state.employees });
    }
  };

  formatDate = (date) => {
    date = new Date(date);
    let dob = [];
    dob.push(("0" + (date.getMonth() + 1)).slice(-2));
    dob.push(("0" + date.getDate()).slice(-2));
    dob.push(date.getFullYear());

    // Join formatted date
    return dob.join("-");
  };

  render() {
    return (
      <>
        <SearchBar
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <div className="container mt-4">
          <EmployeeTable
            state={this.state}
            sortBy={this.sortBy}
            filterEmployees={this.filterEmployees}
            formatDate={this.formatDate}
          />
        </div>
      </>
    );
  }
}

export default EmployeesContainer;