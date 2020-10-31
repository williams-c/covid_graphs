import React, { useState, useEffect } from 'react';

const Menu = () => {

  return (
    <div className="Menu">

      <div>
        Select Dataset
        <select className="dropdown dataset_dropdown">
          <option>Total Cases</option>
          <option>Cases Per Day</option>
        </select>
      </div>

      <div>
        Select Population
        <select className="dropdown dataset_dropdown">
          <option>States</option>
          <option>Counties</option>
        </select>
      </div>

    </div>
  );
}

export default Menu;
