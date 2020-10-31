const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const { PythonShell } = require('python-shell')

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
  const start = req.query.start
  const end = req.query.end
  const states = req.query.state
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: [start, end, ...states]
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
  const start = req.query.start
  const end = req.query.end
  const counties = req.query.county
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: [start, end, state, ...counties]
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
  const start = req.query.start
  const end = req.query.end
  const states = req.query.state
  // interval can be day(D), week(W), month(M) or year(Y)
  const interval = req.query.interval ? req.query.interval : 'D'
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: [start, end, interval, ...states]
  }

  PythonShell.run('state_daily.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }

    res.status(200).sendFile(path.join(__dirname, 'daily_cases_state.csv'))
  })
})

// app.get('/daily/:state/counties', (req, res) => {
//   const state = req.params.state
//   const start = req.query.start
//   const end = req.query.end
//   const counties = req.query.county
//   const options = {
//     mode: 'text',
//     pythonOptions: ['-u'],
//     scriptPath: 'data_scripts',
//     args: [start, end, state, ...counties]
//   }

//   PythonShell.run('county_total.py', options, (err, data) => {
//     if (err) {
//       res.sendStatus(500)
//       throw err
//     }

//     res.status(200).sendFile(path.join(__dirname, 'total_cases_county.csv'))
//   })
// })

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is running on PORT: ${PORT}`);
});
