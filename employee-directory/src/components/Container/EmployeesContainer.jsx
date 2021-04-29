import React, { Component } from 'react';
import SearchBar from "../SearchBar";
import EmployeeTable from "../EmployeeTable";
import API from "../../utils/API";

class EmployeeContainer extends Component {
    state = {
        search: "",
        employees: [],
        searchFilters: [],
        informationSort: this.sortingInfo,
    };

    sortingInfo = () => {
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

    render() {
        return (  );
    }
}

export default EmployeeContainer;