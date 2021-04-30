import React from 'react';
import "./style.css";

const SearchBar = (props) => {
    return (
        <nav className="navbar navbar-light bg-light justifiy-content-center">
            <form className="form-inline m-2" onSubmit={props.hanldeFormSubmit}>
                <input 
                className="form-control"
                value={props.value}
                name="search"
                onChange={props.handleInputChange}
                type="search"
                placeholder="Search"
                ></input>
            </form>
        </nav>
    )
}

export default SearchBar;