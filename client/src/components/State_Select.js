import React, { useState, useEffect } from 'react';

const State_Select = ({ addState, selectedStates, allStates }) => {

  return (


      <div className="pop-select">

        {allStates.map((value, index) => {
          return (
            <div onClick={(e) => {addState(e)}} className={`checkbox-wrapper ${selectedStates.includes(value) ? "checkbox-selected" : ""}`}>

              <span value={value} className={"checkbox-text"}>
                {value}
              </span>

            </div>
          )
        })}

      </div>

  );
}

export default State_Select;
