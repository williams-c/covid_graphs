import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import Menu from './components/Menu';

const App = () => {
  const [queryString, updateQueryString] = useState('')

  return (

      <div className="container">
        {/* <div className="header">
          COVID-19 Data Visualizer
        </div> */}

        <div className="App">
          {
            queryString ?
            <Graph query={queryString} /> :
            <h1 className="default-text">What Would You Like To See?</h1>
          }
          <Menu updateQuery={updateQueryString}/>
        </div>

      </div>

  );
}

export default App;

// /daily/states?state=Utah