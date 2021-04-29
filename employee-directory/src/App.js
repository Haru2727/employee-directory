import React from 'react';
import "./App.css";
import Header from "./components/Header";
import EmployeesContainer from "./component/Container/EmployeesContainer";


function App() {
  return (
    <div className="App">
    <Header />
    <EmployeesContainer />
    </div>
  );
}

export default App;
