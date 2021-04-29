import React, { Component } from 'react';
import SearchBar from "../SearchBar";
import EmployeeTable from "../EmployeeTable";
import API from "../../utils/API";

class EmployeeContainer extends Component {
    state = {
        search: "",
        employees: [],
        searchFilters: [],
        informationSort: this.getSortingInfo ,
    };

    getSortingInfo()  {
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

    // Updating the state of search to filter by imput
    handleInputChange = (e) => {
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
        }else {
            sortedEmployees = this.state.searchFilters.sort((a, b) => {
                a = a[key];
                b = b[key];

            })
        }
    }

    render() {
        return (  );
    }
}

export default EmployeeContainer;