import './App.css';
import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import Menu from './components/Menu';
import Graph_History from './components/Graph_History';
import Testing_Locations from './components/Testing_Locations';
import Login from './components/Login';
import SignUp from './components/SignUp';


const App = () => {
  const tokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(tokens);
  const [queryString, updateQueryString] = useState('')
  const [plotData, updateData] = useState('')
  const [plotLayout, updateLayout] = useState('')
  const [plotHistory, updatePlotHistory] = useState([])
  const [selectedGraph, updateSelectedGraph] = useState(-1)
  const [userLocation, updateUserLocation] = useState([])
  const [loginStatus, updateLoginStatus] = useState('logged-out')

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  }

  const changeSelectedHandler = (index) => {
    updateSelectedGraph(index)
    let selected = plotHistory[index]
    let data = selected[1]
    let layout = selected[2]
    updateData(data)
    updateLayout(layout)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const location = [position.coords.latitude, position.coords.longitude]
      updateUserLocation(location)
    });
    // if token exists user is logged in and redirect to main page
    if (authTokens) {
      userLogin();
    }
  },[])

  const guestLogin = () => {
    updateLoginStatus('guest')
  }

  const userLogin = () => {
    updateLoginStatus('logged-in')
  }

  const userSignUp = () => {
    updateLoginStatus('sign-up')
  }

  return (

      <div className="container">

        {loginStatus === 'logged-in' ?
        <Testing_Locations id="test-location" userLocation={userLocation} /> : ''}

        <div className="App">
          <h1>COVID-19 Data Visualizer</h1>
          {/* conditionally render login page, sign-up page or graphing UI  */}
          {loginStatus === 'logged-out' ?
            <Login userLogin={userLogin} signUp={userSignUp} guest={guestLogin} setTokens={setTokens}/> :
            loginStatus === 'sign-up' ? <SignUp userLogin={userLogin} guest={guestLogin}/> :
            <div>
              {
                queryString ?
                <Graph
                  query={queryString}
                  plotData={plotData}
                  plotLayout={plotLayout}
                  updateData={updateData}
                  updateLayout={updateLayout}
                  updatePlotHistory={updatePlotHistory}
                  updateSelectedGraph={updateSelectedGraph}
                /> :
                <h3 className="default-text">What Would You Like To See?</h3>
              }
              <Menu updateQuery={updateQueryString}/>
            </div>
          }

        </div>
        {loginStatus === 'logged-in' ? <Graph_History id='graph-history' plotHistory={plotHistory} selectedGraph={selectedGraph} changeSelected={changeSelectedHandler} /> : ''}

      </div>

  );
}

export default App;

// /daily/states?state=Utah