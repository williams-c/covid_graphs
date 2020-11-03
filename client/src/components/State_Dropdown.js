import React from 'react';

const State_Dropdown = ({ selected, states, update }) => {
  return (
    <div >
      Select State:
      <select onChange={(e) => {update(e.target.value)}} className="dropdown">
        <option value={selected}>{selected}</option>
        {states.map((state) => {
          return <option value={state}>{state}</option>
        })}
      </select>
    </div>
  )
}

export default State_Dropdown;