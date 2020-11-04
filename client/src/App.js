import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import Menu from './components/Menu';
import Graph_History from './components/Graph_History';

const App = () => {
  const [queryString, updateQueryString] = useState('')
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')
  const [plotHistory, updatePlotHistory] = useState([])
  const [selectedGraph, updateSelectedGraph] = useState(-1)

  const changeSelectedHandler = (index) => {
    updateSelectedGraph(index)
    let selected = plotHistory[index]
    let data = selected[1]
    let layout = selected[2]
    updateData(data)
    updateLayout(layout)
  }

  return (

      <div className="container">
        {/* <div className="header">
          COVID-19 Data Visualizer
        </div> */}

        <div className="App">
          {
            queryString ?
            <Graph
              query={queryString}
              plotData={plotData}
              plotLayout={plotLayout}
              updateData={updateData}
              updateLayout={updateLayout}
              updatePlotHistory={updatePlotHistory}
              updateSelectedGraph={updateSelectedGraph}
            /> :
            <h1 className="default-text">What Would You Like To See?</h1>
          }
          <Menu updateQuery={updateQueryString}/>
        </div>
          <Graph_History plotHistory={plotHistory} selectedGraph={selectedGraph} changeSelected={changeSelectedHandler} />
      </div>

  );
}

export default App;

// /daily/states?state=Utah