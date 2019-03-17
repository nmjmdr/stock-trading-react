import React, { Component } from 'react';
import './App.css';
import NavBar from './Navbar'
import Search from './search'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="MainContainer">
          <div className="LeftContainer">
            <NavBar />
          </div>
          <div className="RightContainer">
              <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
