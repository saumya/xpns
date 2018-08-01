import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RootControllerView from './comps/RootControllerView.comp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Expense</h1>
        </header>
        <p className="App-intro">
          Version 4. New features and bug fixes.
        </p>
        <RootControllerView />
      </div>
    );
  }
}

export default App;
