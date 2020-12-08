const express = require('express')
const { PythonShell } = require('python-shell')
const { getDate } = require('../server_helpers/getDate')
const stringify = require('csv-stringify');
const queries = require('../database/queries')

const router = express.Router()

router.get('/:state/counties', (req, res) => {
  const state = req.params.state
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: [state]
  }

  PythonShell.run('get_counties.py', options, (err, data) => {
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

router.get('/states', (req, res) => {
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
  }

  PythonShell.run('get_states.py', options, (err, data) => {
    if (err) {
      res.sendStatus(500)
      throw err
    }

    res.status(200).sendFile(path.join(__dirname, 'static', 'states_list.csv'))
  })
})

module.exports = router;