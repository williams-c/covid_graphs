import React, { useState, useEffect } from 'react';

const State_Select = ({ addCounty, selectedCounties, allCounties }) => {

  return (


      <div className="pop-select">

        {allCounties.map((value, index) => {
          return (
            <div onClick={(e) => {addCounty(e)}} className={`checkbox-wrapper ${selectedCounties.includes(value) ? "checkbox-selected" : ""}`}>

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
