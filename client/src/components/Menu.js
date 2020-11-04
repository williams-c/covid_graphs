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
  const [timeframe, updateTimeFrame] = useState('')
  const [popSelection, updatePopSelection] = useState('')
  const [startDate, updateStart] = useState('2020-01-22')
  const [endDate, updateEnd] = useState('2020-11-02')
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
    if (!datasetSelection) {
      alert('Please select a dataset')
      return
    } else if (!popSelection) {
      alert ('Please select a population')
      return
    }
    let queryString = `/${datasetSelection}`
    if (popSelection === 'county') {
      if (!stateCounty) {
        alert('Please select a state')
        return
      }
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
    if (timeframe) {
      queryString += `interval=${timeframe}&`
    }
    updateQuery(queryString)
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

  const datasetHandler = (value) => {
    if (!value) {
      updateDatasetSelection('')
      updateTimeFrame('')
      return
    }
    if (value === 'Daily') {
      updateDatasetSelection(value)
      updateTimeFrame('D')
      if (value === 'Weekly') {
        updateTimeFrame('W')
      } else if (value === 'Monthly') {
        updateTimeFrame('M')
      }
    } else {
      updateDatasetSelection(value)
      updateTimeFrame('')
    }
  }

  return (
    <div className="Menu">

      <div>
        Select Dataset:
        <select onChange={(e) => {datasetHandler(e.target.value)}} className="dropdown dataset_dropdown">
          <option></option>
          <option value="Total">Total Cases</option>
          <option value="Change">Percent Change</option>
          <option value="Daily">Cases Per Day</option>
          <option value="Weekly">Cases Per Week</option>
          <option value="Monthly">Cases Per Month</option>
        </select>
      </div>

      <div>
        Select Population:
        <select onChange={(e) => {
            updatePopSelection(e.target.value)
            updateAreas([])
          }} className="dropdown dataset_dropdown">
          <option></option>
          <option value="state">States</option>
          <option value="county">Counties</option>
        </select>
      </div>

      {popSelection === 'county' ? <State_Dropdown selected={stateCounty} states={stateList} update={stateCountyHandler} /> : ''}

      <div>
        Starting Date:
        <input value={startDate} onChange={(e) => {updateStart(e.target.value)}} type="date" className="dropdown date-input" min="2020-01-23" max="2020-11-01"></input>
        Ending Date:
        <input value={endDate} onChange={(e) => {updateEnd(e.target.value)}} type="date" className="dropdown date-input" min="2020-01-24" max="2020-11-02"></input>
      </div>

      {datasetSelection && popSelection ? <button onClick={submitQuery} className="submit-btn">Create Graph</button> : ''}

      {popSelection === '' ?
      ''
      :
      popSelection === 'state' ?
      <State_Select addState={selectAreaHandler} selectedStates={selectedAreas} allStates={stateList}/>
      :
      countiesLoading ?
      <div className="county-loading">Loading Counties for {stateCounty}...</div>
      :
      <County_Select addCounty={selectAreaHandler} selectedCounties={selectedAreas} allCounties={countiesList} />
      }

    </div>
  );
}

export default Menu;
