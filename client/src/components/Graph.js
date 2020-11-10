import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import axios from 'axios';
import fileDownload from 'js-file-download';

const Graph = ({ query, plotData, plotLayout, updateData, updateLayout, updatePlotHistory, updateSelectedGraph }) => {
  // const [plotData, updateData] = useState('')
  // const [plotLayout, updateLayout] = useState('')
  const [loading, updateLoading] = useState(false)

  // create new graph on query submission
  useEffect(async () => {
    updateLoading(true)
    createPlot(query)
  },[query])

  // display selected graph on thumbnail click
  useEffect(() => {
    changePlot(plotData, plotLayout)
  }, [plotData, plotLayout])

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
      plotLabel = {
        title: `${plotLabel} COVID-19 Cases`,
        height: (document.querySelector('#graph').clientWidth * 0.6),
        autosize: true,
        yaxis: {
          automargin: true,
        },
        margin: {
          l: 25,
          r: 25,
          b: 50,
          t: 50,
          pad: 4
        },
      }
      updateLayout(plotLabel)
      Plotly.newPlot(
        'graph',
         graphElements,
         plotLabel,
         {responsive: true,},
         )
      .then(
          function(gd)
           {
            Plotly.toImage(gd, {height:300,width:300})
               .then(
                   function(url)
               {
                   updatePlotHistory(history => [...history, [url, graphElements, plotLabel]])
               }
               )
          });
      updateSelectedGraph(-1)
      updateLoading(false)
    })
  }

  const changePlot = (data, layout) => {
    Plotly.newPlot(
      'graph',
      data,
      layout,
      {responsive: true,},
     )
  }

  const downloadHandler = () => {
    axios.get(query)
      .then((response) => {
        fileDownload(response.data, 'covid_data.csv')
      })
  }

  return (
    <div className="Graph">
      {
        loading ?
        <h3>Loading, please wait...</h3> :
        ''
      }
      <div id="graph"></div>
        {loading ? '' : <button className="download-btn" onClick={downloadHandler}>Download CSV</button>}
    </div>
  );
}

export default Graph;