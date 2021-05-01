import React from "react";
import "./style.css";

const Header = () => {
  return (
    <header>
      <h1 className="text-center">Employee Directory</h1>
      <p className="text-center">
        Use the colume headers or the search bar to filter your search
      </p>
    </header>
  );
};

export default Header;