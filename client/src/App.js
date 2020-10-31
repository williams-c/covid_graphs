import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import Menu from './components/Menu';

const App = () => {

  return (
    <div className="App">
      <Graph />
      <Menu />
    </div>
  );
}

export default App;
