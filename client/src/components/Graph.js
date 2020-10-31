import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'

const Graph = () => {
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')

  useEffect(() => {
    createPlot("http://localhost:3000/total/states?start=2020-06-01&end=2020-10-01&state=Alabama&state=Arkansas&state=California")
  },[])

  const graphColors = ['black', 'red', 'green','blue','orange','purple', 'pink','yellow']

  const createPlot = (endpoint) => {
    Plotly.d3.csv(endpoint, (rows) => {
      const unpack = (rows, key) => {
        return rows.map((row) => { return row[key]; });
      }
      let graphElements = []
      let colorPicker = 0
      // iterate through csv columns and create a line for each
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

          if (colorPicker >= graphColors.length - 1) {
            colorPicker = 0
          } else {
            colorPicker += 1
          }

          graphElements.push(trace)
        }
      }
      // update Plot data
      updateData(graphElements);

      updateLayout({
        title: 'Total Covid Cases By State',
      });
    })
  }

  return (
    <div className="Graph">
      <Plot data={plotData} layout={plotLayout} />
    </div>
  );
}

export default Graph;