import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testing_Locations = ({ userLocation }) => {
  const [testingLocations, updateTestingLocations] = useState([])

  useEffect(() => {
    axios.get('/testing_locations', {
      params : {
        lat: userLocation[0],
        long: userLocation[1],
      }
      })
      .then((response) => {
        const locations = response.data.results
        const locationData = []
        // just get top/closest five results
        for (let i = 0; i < 5; i++) {
          let data = locations[i]
          let name = data.name
          let address = data.formatted_address
          let open = data.opening_hours.open_now
          locationData.push([name, address, open])
        }
        updateTestingLocations(locationData)
      })
      .catch((err) => console.error(err))
  }, [userLocation])

  return (
    <div className="sidebar">

      <p className="title-text test-location-text">Feeling Sick? Get Tested!</p>

      <div className="title-text">
        <p className="test-location-text">Testing Locations Near You</p>

        {testingLocations.map((location) => {
          return (<div>
                    <p className="test-location-title">{location[0]}{location[2] ? ' - Open Now' : ''}</p>
                    <p className="test-location-address">{location[1]}</p>
                  </div>)
      })}
      </div>
    </div>
  )
}

export default Testing_Locations