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
// test = ?start=2020-04-01&end=2020-06-30&state=Colorado&state=Utah
app.get('/csv_data/states', (req, res) => {
  const start = req.query.start
  const end = req.query.end
  const states = req.query.state
  console.log(...states)
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: [start, end, ...states]
  }

  PythonShell.run('state_total.py', options, (err, data) => {
    if (err) throw err

    res.status(200).sendFile(path.join(__dirname, 'total_cases_state.csv'))
  })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is running on PORT: ${PORT}`);
});
