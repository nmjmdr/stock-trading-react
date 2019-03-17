import React, { Component } from 'react';
import WelcomeMessage from '../welcome-message';
import '../App.css';
import Funds from '../funds'
import Performance from '../performance'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <WelcomeMessage/>
        <div className="MainBox">
          <div className="HalfBox" >
            <Funds />
          </div>
          <div className="HalfBox">
            <Performance />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;