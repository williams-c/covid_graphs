const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const { PythonShell } = require('python-shell')
const { getDate } = require('./server_helpers/getDate')

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

app.get('/hello', (req, res) => {
  res.status(200).send('hello world!')
})

app.get('/data', async (req, res) => {
  const dataPath = path.join(__dirname, 'data_scripts', 'daily_cases_county.csv')
  res.sendFile(dataPath)
})
// test = /total/states?start=2020-04-01&end=2020-06-30&state=Colorado&state=Utah&state=Montana
app.get('/total/states', (req, res) => {
  const start = req.query.start ? req.query.start : '2020-01-22'
  const end = req.query.end ? req.query.end : getDate()
  const states = req.query.state ? req.query.state : 'all'
  let argsList = []
  if (typeof states === 'string') {
    argsList = [start, end, states]
  } else {
    argsList = [start, end, ...states]
  }
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: argsList
  }

  PythonShell.run('state_total.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }

    res.status(200).sendFile(path.join(__dirname, 'total_cases_state.csv'))
  })
})

app.get('/total/:state/counties', (req, res) => {
  const state = req.params.state
  const start = req.query.start ? req.query.start : '2020-01-22'
  const end = req.query.end ? req.query.end : getDate()
  const counties = req.query.county ? req.query.county : 'all'
  let argsList = []
  if (typeof counties === 'string') {
    argsList = [start, end, state, counties]
  } else {
    argsList = [start, end, state, ...counties]
  }
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: argsList
  }

  PythonShell.run('county_total.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }

    res.status(200).sendFile(path.join(__dirname, 'total_cases_county.csv'))
  })
})

app.get('/daily/states', (req, res) => {
  const start = req.query.start ? req.query.start : '2020-01-22'
  const end = req.query.end ? req.query.end : getDate()
  const states = req.query.state ? req.query.state : 'all'
  // interval can be day(D), week(W), month(M) or year(Y)
  const interval = req.query.interval ? req.query.interval : 'D'
  let argsList = []
  if (typeof states === 'string') {
    argsList = [start, end, interval, states]
  } else {
    argsList = [start, end, interval, ...states]
  }
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: argsList
  }

  PythonShell.run('state_daily.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }

    res.status(200).sendFile(path.join(__dirname, 'daily_cases_state.csv'))
  })
})

app.get('/daily/:state/counties', (req, res) => {
  const state = req.params.state
  const start = req.query.start ? req.query.start : '2020-01-22'
  const end = req.query.end ? req.query.end : getDate()
  const counties = req.query.county ? req.query.county : 'all'
  // interval can be day(D), week(W), month(M) or year(Y)
  const interval = req.query.interval ? req.query.interval : 'D'
  let argsList = []
  // county can be multi item array, or a string
  if (typeof counties === 'string') {
    argsList = [start, end, state, interval, counties]
  } else {
    argsList = [start, end, state, interval, ...counties]
  }
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: argsList
  }

  PythonShell.run('county_daily.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }

    res.status(200).sendFile(path.join(__dirname, 'daily_cases_county.csv'))
  })
})

app.listen(PORT, () => {
  console.log(`Your server is running on PORT: ${PORT}`);
});
