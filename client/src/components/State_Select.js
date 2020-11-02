import React, { useState, useEffect } from 'react';

const State_Select = ({ selectedStates, updateStates, allStates, currentState, updateCurrent }) => {
  // const [currentState, updateCurrentState] = useState('')

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

          {/* <select value={currentState} onChange={(e) => {updateCurrent(e.target.value)}} className="dropdown state-dropdown">

  <option value=""></option>
  {allStates.map((value, index) => {
    return (<option value={value}>{value}</option>)
  })}

  </select>

  <button onClick={() => {addStateHandler()}} className="add-state-btn">Add</button> */}

        {allStates.map((value, index) => {
          return (
            <div className="checkbox-wrapper">

            <span className="checkbox-text">{value}</span>

          </div>
          )
        })}

      </div>

  );
}

export default State_Select;
