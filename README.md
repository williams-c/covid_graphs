# covid_graphs

An interactive graphing tool and csv generator for Covid-19 data.
Master dataset is sourced from the COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University
https://github.com/CSSEGISandData/COVID-19

# Features

Users can interact with the application to find nearest Covid-19 testing locations, generate customizable graphs for specific states/counties and specific date ranges. Graphs can also be downloaded as image files or in time-series csv format. Graph history is also stored and users can click on images on the right to revisit previous graphs.

# API

The application interfaces with the server API which can also be queried directly to download raw time-series csv files of the data

Routes:

**/list/states**

  - returns a list of states that the API can generate data for
  
**/list/:state/counties**

  - returns a list of counties for a given state that the API can generate data for
  
  - required parameters:
    - state - the state to return data for
  
**/total/state**

 - returns the total number of confirmed cases for the given states

 - optional parameters:
   - start - starting date for the time-series, must be of format 'YYYY-MM-DD' If null, 2020-01-22  will be selected
     * data begins on 2020-01-22
   - end - ending date for the time-series, must be of format 'YYYY-MM-DD' If null, current date will be selected
   - state - state to include in time-series, can request any number of states. If left blank, will return all states
  
  
**/total/:state/county**
  
 - returns the total number of confirmed cases for the given counties

 - required parameters:
   - state - the state for which you want county data to be returned

 - optional parameters:
   - start - starting date for the time-series, must be of format 'YYYY-MM-DD' If null, 2020-01-22  will be selected
     * data begins on 2020-01-22
   - end - ending date for the time-series, must be of format 'YYYY-MM-DD' If null, current date will be selected
   - county - county to include in time-series, can request any number of counties. If left blank, will return all counties
  
**/daily/state**
  
 - returns number of cases per given interval for the given states

 - optional parameters:
   - start - starting date for the time-series, must be of format 'YYYY-MM-DD' If null, 2020-01-22  will be selected
     * data begins on 2020-01-22
   - end - ending date for the time-series, must be of format 'YYYY-MM-DD' If null, current date will be selected
   - state - state to include in time-series, can request any number of states. If left blank, will return all states
   - interval - defaults to per day, to access per week data pass in 'W' and for per month pass in 'Y'
  
**/daily/:state/county**

 - returns number of cases per given interval for the given counties

 - required parameters:
   - state - the state for which you want county data to be returned

 - optional parameters:
   - start - starting date for the time-series, must be of format 'YYYY-MM-DD' If null, 2020-01-22  will be selected
     * data begins on 2020-01-22
   - end - ending date for the time-series, must be of format 'YYYY-MM-DD' If null, current date will be selected
   - county - county to include in time-series, can request any number of counties. If left blank, will return all counties
   - interval - defaults to per day, to access per week data pass in 'W' and for per month pass in 'Y'
  
**/change/state**
  
 - returns daily percent change in cases for the given states

 - optional parameters:
   - start - starting date for the time-series, must be of format 'YYYY-MM-DD' If null, 2020-01-22  will be selected
    * data begins on 2020-01-22
   - end - ending date for the time-series, must be of format 'YYYY-MM-DD' If null, current date will be selected
   - state - state to include in time-series, can request any number of states. If left blank, will return all states
   - interval - defaults to per day, to access per week data pass in 'W' and for per month pass in 'Y'
  
  
**/change/:state/county**

 - returns daily percent change in cases for the given counties

 - required parameters:
   - state - the state for which you want county data to be returned

 - optional parameters:
   - start - starting date for the time-series, must be of format 'YYYY-MM-DD' If null, 2020-01-22 date will be selected
    * data begins on 2020-01-22
   - end - ending date for the time-series, must be of format 'YYYY-MM-DD' If null, current date will be selected
   - county - county to include in time-series, can request any number of counties. If left blank, will return all counties



# Requirements 

 - Node
 - npm
 - Python
 - Pandas(python library)
 *For the geolocation features to work you will also need to add a Google Places API key to your .env file *

# Development

To start developing you'll need python/pandas installed on your computer first, then
```bash
cd client && npm install
cd ..
cd server && npm install
cd ..
npm start
```
