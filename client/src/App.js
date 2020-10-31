import './App.css';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'

const App = () => {
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')

  useEffect(() => {
    createPlot("http://localhost:3000/csv_data/Colorado/counties?start=2020-03-01&end=2020-10-15&county=Boulder&county=Weld")
  },[])

  const graphColors = ['black', 'red', 'green','blue','orange','purple', 'pink','yellow']
  const createPlot = (endpoint) => {
    Plotly.d3.csv(endpoint, (rows) => {
      const unpack = (rows, key) => {
        return rows.map((row) => { return row[key]; });
      }
      let graphElements = []
      let colorPicker = 0
      // iterate through columns and create a line for each
      for (const [key, value] of Object.entries(rows[0])) {
        if (key === 'Date') {
          continue
        } else {
          let trace = {
            type: "scatter",
            mode: "lines",
            name: key,
            x: unpack(rows, 'Date'),
            y: unpack(rows, key),
            line: {color: graphColors[colorPicker]},
          }
          colorPicker += 1
          graphElements.push(trace)
        }
      }

      updateData(graphElements);

      updateLayout({
        title: 'Total Covid Cases By State',
      });
    })
  }

  return (
    <div className="App">
      <Plot data={plotData} layout={plotLayout} />
    </div>
  );
}

export default App;
