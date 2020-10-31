import React, { useState, useEffect } from 'react';

const test = ['Colorado', 'Utah', 'Montana', 'Missouri']

const State_Select = ({ selectedStates, updateStates, allStates }) => {
  const [currentState, updateCurrentState] = useState('')

  const addStateHandler = () => {
    if (selectedStates.includes(currentState) || !currentState) {
      alert('State already selected')
      return
    }
    let states = selectedStates
    states.push(currentState)
    updateStates(states)
  }

  return (
    <div className="pop-select">

      Select States

        <select onChange={(e) => {updateCurrentState(e.target.value)}} className="dropdown state-dropdown">

          <option value=""></option>
          {allStates.map((value, index) => {
            return (<option value={value}>{value}</option>)
          })}

        </select>

        <button onClick={() => {addStateHandler()}} className="add-state-btn">Add</button>

    </div>
  );
}

export default State_Select;
