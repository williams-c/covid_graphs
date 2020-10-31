import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import Menu from './components/Menu';

const App = () => {
  const [queryString, updateQueryString] = useState('')

  return (
    <div className="App">
      <Graph query={queryString}/>
      <Menu updateQuery={updateQueryString}/>
    </div>
  );
}

export default App;
