import React, { useState, useEffect } from 'react';
import axios from 'axios';
import State_Select from './State_Select';
import County_Select from './County_Select';
import State_Dropdown from './State_Dropdown';

const Menu = ({ updateQuery }) => {
  const [stateList, updateStates] = useState([])
  const [stateCounty, updateStateCounty] = useState('')
  const [countiesList, updateCountiesList] = useState([])
  const [selectedAreas, updateAreas] = useState([])
  const [datasetSelection, updateDatasetSelection] = useState('')
  const [popSelection, updatePopSelection] = useState('')
  const [startDate, updateStart] = useState('')
  const [endDate, updateEnd] = useState()
  const [countiesLoading, updateCountiesLoading] = useState(false)

  useEffect(() => {
    getStates()
  }, [])

  const getStates = async () => {
    try{
      const data = await axios.get('/data/states_list.csv')
      let stateData = parseCsv(data.data)
      updateStates(stateData)
    } catch(err) {
      throw err
    }
  }

  const getCounties = async (state) => {
    try{
      const data = await axios.get(`/list/${state}/counties`)
      let countyData = parseCsv(data.data)
      updateCountiesList(countyData)
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
    let queryString = `/${datasetSelection}`
    if (popSelection === 'county') {
      queryString += `/${stateCounty}`
    }
    queryString += `/${popSelection}?`
    if (startDate) {
      queryString += ('start=' + startDate + '&')
    }
    if (endDate) {
      queryString += ('end=' + endDate + '&')
    }
    selectedAreas.forEach((area) => {
      queryString += (popSelection + '=' + area + '&')
    })
    updateQuery(queryString)
    updateAreas([])
    updateStart('')
    updateEnd('')
  }

  const stateCountyHandler = async (state) => {
    updateCountiesLoading(true)
    updateStateCounty(state)
    await getCounties(state)
    updateCountiesLoading(false)
  }

  const selectAreaHandler = (e) => {
    const selection = e.currentTarget.textContent
    if (selectedAreas.includes(selection)) {
      updateAreas(selectedAreas.filter((value) => {
        return value !== selection
      }))
    } else {
      updateAreas(selectedAreas.concat([e.currentTarget.textContent]))
    }
  }

  return (
    <div className="Menu">
      <button onClick={submitQuery} className="submit-btn">Submit</button>
      <div>
        Select Dataset:
        <select onChange={(e) => {updateDatasetSelection(e.target.value)}} className="dropdown dataset_dropdown">
          <option value={datasetSelection}></option>
          <option value="total">Total Cases</option>
          <option value="daily">Cases Per Day</option>
        </select>
      </div>

      <div>
        Select Population:
        <select onChange={(e) => {updatePopSelection(e.target.value)}} className="dropdown dataset_dropdown">
          <option value={popSelection}></option>
          <option value="state">States</option>
          <option value="county">Counties</option>
        </select>
      </div>

      {popSelection === 'county' ? <State_Dropdown selected={stateCounty} states={stateList} update={stateCountyHandler} /> : ''}

      <div>
        Starting Date:
        <input value={startDate} onChange={(e) => {updateStart(e.target.value)}} type="date" className="dropdown date-input" min="2020-01-22" max="2020-10-30"></input>
        Ending Date:
        <input value={endDate} onChange={(e) => {updateEnd(e.target.value)}} type="date" className="dropdown date-input" min="2020-01-23" max="2020-10-31"></input>
      </div>

      {popSelection === '' ?
      ''
      :
      popSelection === 'state' ?
      <State_Select addState={selectAreaHandler} selectedStates={selectedAreas} allStates={stateList}/>
      :
      countiesLoading ?
      <div>Loading Counties for {stateCounty}</div>
      :
      <County_Select addCounty={selectAreaHandler} selectedCounties={selectedAreas} allCounties={countiesList} />
      }

    </div>
  );
}

export default Menu;
