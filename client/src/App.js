import './App.css';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'

const App = () => {
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')

  useEffect(() => {
    createPlot()
  },[])

  const createPlot = () => {
    // d3.csv('/state.csv').then(data => {console.log(data)})
    Plotly.d3.csv("http://localhost:3000/data", (rows) => {
      console.log(rows)
      const unpack = (rows, key) => {
        return rows.map((row) => { return row[key]; });
      }

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'Colorado',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'Colorado'),
        line: {color: '#17BECF'}
      }

      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'Utah',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'Utah'),
        line: {color: '#7F7F7F'}
      }

      updateData([trace1,trace2]);

      updateLayout({
        title: 'Total Covid Cases By State',
      });
    })
  }

  return (
    <div className="App">
      Test
      <Plot data={plotData} layout={plotLayout} />
    </div>
  );
}

export default App;
