const express = require('express')
const { PythonShell } = require('python-shell')
const { getDate } = require('../server_helpers/getDate')
const stringify = require('csv-stringify');
const queries = require('../database/queries')

const router = express.Router()

router.get('/state', (req, res) => {
  const start = req.query.start ? req.query.start : '2020-01-23'
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

  PythonShell.run('state_pct_change.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }
    let response = []
    data.forEach((row) => {
      row = row.split(',')
      response.push(row)
    })
    stringify(response, function(err, output){
      res.status(200).send(output)
    })
  })
})

router.get('/:state/county', (req, res) => {
  const state = req.params.state
  const start = req.query.start ? req.query.start : '2020-01-23'
  const end = req.query.end ? req.query.end : getDate()
  const counties = req.query.county ? req.query.county : 'all'
  let argsList = []
  // county can be multi item array, or a string
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

  PythonShell.run('county_pct_change.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }
    let response = []
    data.forEach((row) => {
      row = row.split(',')
      response.push(row)
    })
    stringify(response, function(err, output){
      res.status(200).send(output)
    })
  })
})


module.exports = router;