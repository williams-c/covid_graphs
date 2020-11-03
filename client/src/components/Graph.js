import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'

const Graph = ({ query }) => {
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')
  const [loading, updateLoading] = useState(false)

  useEffect(async () => {
    updateLoading(true)
    createPlot("http://localhost:3000/" + query)
  },[query])

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
      updateData(graphElements)
      let plotLabel = query.split('/')
      plotLabel = plotLabel[1]
      updateLayout({
        title: `${plotLabel} COVID-19 Cases`,
      })
      updateLoading(false)
    })
  }

  return (
    <div className="Graph">
      {
       loading ?
       <h1>Loading, please wait...</h1> :
       <Plot data={plotData} layout={plotLayout} />
      }
    </div>
  );
}

export default Graph;