import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import Menu from './components/Menu';
import Graph_History from './components/Graph_History';
import Testing_Locations from './components/Testing_Locations';

const App = () => {
  const [queryString, updateQueryString] = useState('')
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')
  const [plotHistory, updatePlotHistory] = useState([])
  const [selectedGraph, updateSelectedGraph] = useState(-1)
  const [userLocation, updateUserLocation] = useState([])

  const changeSelectedHandler = (index) => {
    updateSelectedGraph(index)
    let selected = plotHistory[index]
    let data = selected[1]
    let layout = selected[2]
    updateData(data)
    updateLayout(layout)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const location = [position.coords.latitude, position.coords.longitude]
      updateUserLocation(location)
    });
  },[])

  return (

      <div className="container">

        <Testing_Locations userLocation={userLocation} />

        <div className="App">
          <h1>COVID-19 Data Visualizer</h1>
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
            <h3 className="default-text">What Would You Like To See?</h3>
          }
          <Menu updateQuery={updateQueryString}/>
        </div>
          <Graph_History plotHistory={plotHistory} selectedGraph={selectedGraph} changeSelected={changeSelectedHandler} />
      </div>

  );
}

export default App;

// /daily/states?state=Utah