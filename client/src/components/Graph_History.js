import React from 'react'
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'
const d3 = Plotly.d3;
const img_jpg= d3.select('#jpg-export');



const Graph_History = ({ plotHistory, selectedGraph, changeSelected, queryString }) => {


  return (
    <div className="sidebar">

        {plotHistory.length > 1 ? <p className="title-text test-location-text">Your Previous Graphs</p>: ''}

      {plotHistory.map((image, index) => {
        if (selectedGraph === -1 && index === 0 && queryString) {
          return
        } else if (selectedGraph === index) {
          return
        }
        let imgUrl = image[0]
        return (
        <img onClick={() => {changeSelected(index)}} className="graph-img" src={imgUrl}></img>)
      })}
    </div>
  )
}

export default Graph_History