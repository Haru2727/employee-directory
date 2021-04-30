import React, { Component } from 'react';
import SearchBar from "../SearchBar";
import EmployeeTable from "../EmployeeTable";
import API from "../../utils/API";

class EmployeeContainer extends Component {
    state = {
        search: "",
        employees: [],
        searchFilters: [],
        informationSort: this.getSortingInfo,
    };

    getSortingInfo() {
        return {
            name: "",
            phone: "",
            email: "",
            dob: "",
        };
    }

    // componentDidMount will load random users as employees from https://randomuser.me/
    componentDidMount() {
        API.getEmployees()
            .then((res) =>
                this.setState({
                    employees: res.data.results,
                    searchFilters: res.data.results,
                })
            )
            .cathc((err) => console.log(err));
    }

    // Updating the state of search to filter by input
    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({ search: value });
        this.filterEmployees(value.toLowerCase().trim());
    };


    handleFormSubmit = (e) => {
        e.preventDefault();
    };
    // Using the key of the specified object to sort its info (and any children it had in the tree)
    // sorting by primary and secondary child i.e last name, first name.
    sortBy = (key, primary = 0, secondary = 0) => {
        let sortedEmployees = this.state.searchFilters;
        if (this.state.informationSort[key]) {
            this.setState({
                searchFilters: sortedEmployees.reverse(),
                informationSort: {
                    ...this.getSortingInfo,
                    [key]: this.state.informationSort[key] === "asc" ? "desc" : "asc",
                },
            });
        } else {
            sortedEmployees = this.state.searchFilters.sort((a, b) => {
                a = a[key];
                b = b[key];

                // if the search for given input is equal to its comparison then it will sort 
                // the search with the other child onject
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
                searchFilters: sortedEmployees,
                informationSort: {
                    ...this.getSortingInfo,
                    [key]: "asc",
                },
            });
        }
    };

    filteredEmployees = (searchword) => {
        if (searchword) {
            this.setState({
                searchFilters: this.state.employees.filter((employee) => {
                    return (
                        employee.name.first
                            .toLowerCase()
                            .contact("", employee.name.last.toLowerCase())
                            .includes(searchword) ||
                        employee.phone.includes(searchword) ||
                        employee.phone.replace(/[^\w\s]/gi, "").includes(searchword) ||
                        employee.email.includes(searchword) ||
                        this.formatDate(employee.dob.date).includes(searchword)
                    );

                }),
            });
        } else {
            this.setState({ searchFilters: this.state.employees });
        }
    };

    formatDate = (date) => {
        date = new Date(date);
        let dob = [];
        dob.push(("0" + (date.getMonth() + 1)).slice(-2));
        dob.push(("0" + date.getDate()).slice(-2));
        dob.push(date.getFullYear());

        return dob.join("-");
    };


    render() {
        return (
            <>
                <SearchBar
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormsubmit={this.handleFormSubmit}
                />
                <div className="comntainer mt-3">
                    <EmployeeTable
                        state={this.state}
                        sortBy={this.sortBy}
                        searchFilters={this.searchFilters}
                        formatDate={this.formatDate}
                    />
                </div>
            </>
        );
    }
}

export default EmployeeContainer;