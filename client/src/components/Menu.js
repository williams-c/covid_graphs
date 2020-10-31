import React, { useState, useEffect } from 'react';
import axios from 'axios';
import State_Select from './State_Select';
import County_Select from './County_Select';

const Menu = ({ updateQuery }) => {
  const [countyList, updateCounties] = useState('')
  const [stateList, updateStates] = useState([])
  const [selectedStates, updateSelectedStates] = useState([])
  const [datasetSelection, updateDatasetSelection] = useState('')
  const [popSelection, updatePopSelection] = useState('')
  const [startDate, updateStart] = useState('')
  const [endDate, updateEnd] = useState()

  useEffect(() => {
    getStates()
  }, [])

  const getStates = async () => {
    try{
      const data = await axios.get('/list/states')
      let stateData = parseCsv(data.data)
      updateStates(stateData)
    } catch(err) {
      throw err
    }
  }

  const parseCsv = (data) => {
    let rawData = data.split(',')
    // first two elements are blank
    rawData = rawData.slice(2)
    const parsedData = []
    rawData.forEach((row) => {
      let currentRow = row.split('\n')[0]
      parsedData.push(currentRow)
    })
    return parsedData
  }

  const submitQuery = async () => {
    let queryString = '?'
    if (startDate) {
      queryString += ('start=' + startDate + '&')
    }
    if (endDate) {
      queryString += ('end=' + endDate + '&')
    }
    selectedStates.forEach((state) => {
      queryString += ('state=' + state + '&')
    })
    updateQuery('/total/states' + queryString)
    updateSelectedStates([])
    updateStart('')
    updateEnd('')
  }

  return (
    <div className="Menu">
      <button onClick={submitQuery} className="submit-btn">Submit</button>
      <div>
        Select Dataset
        <select onChange={(e) => {updateDatasetSelection(e.target.value)}} className="dropdown dataset_dropdown">
          <option value=""></option>
          <option value="total">Total Cases</option>
          <option value="daily">Cases Per Day</option>
        </select>
      </div>

      <div>
        Select Population
        <select onChange={(e) => {updatePopSelection(e.target.value)}} className="dropdown dataset_dropdown">
          <option value=""></option>
          <option value="States">States</option>
          <option value="Counties">Counties</option>
        </select>
      </div>

      <div>
        Starting Date
        <input onChange={(e) => {updateStart(e.target.value)}} type="date" className="dropdown date-input" min="2020-01-22" max="2020-10-30"></input>
        Ending Date
        <input onChange={(e) => {updateEnd(e.target.value)}} type="date" className="dropdown date-input" min="2020-01-23" max="2020-10-31"></input>
      </div>

      <State_Select selectedStates={selectedStates} updateStates={updateSelectedStates} allStates={stateList}/>

    </div>
  );
}

export default Menu;
