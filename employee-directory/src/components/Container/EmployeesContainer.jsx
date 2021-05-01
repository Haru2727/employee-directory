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

   sortingBy() {
    return {
      name: "",
      phone: "",
      email: "",
      dob: "",
    };
  }

  // loads the page while loading the rest to keep users on page
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

  // Update search state to filter by employee's name
  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({ search: value });
    this.filterEmployees(value.toLowerCase().trim());
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

// Sorting it out with the first and last name then 
// then telling it to look at the last name then first when searching for matches
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

        // this is where if the primary search was an exact match it will sort by the secondary child.
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

  // filtering based off what the input is
  filterEmployees = (searchInput) => {
    if (searchInput) {
      this.setState({
        searchFilter: this.state.employees.filter((employee) => {
          return (
            employee.name.first
              .toLowerCase()
              .concat(" ", employee.name.last.toLowerCase())
              .includes(searchInput) ||
            employee.phone.includes(searchInput) ||
            employee.phone.replace(/[^\w\s]/gi, "").includes(searchInput) ||
            employee.email.includes(searchInput) ||
            this.formatDate(employee.dob.date).includes(searchInput)
          );
        }),
      });
    } else {
      this.setState({ searchFilter: this.state.employees });
    }
  };

  // formatting the date and using date.(method) to get the dob
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