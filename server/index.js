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

app.get('/csv_data', (req, res) => {
  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: 'data_scripts',
    args: ['2020-04-01', '2020-06-30', ['Colorado', 'Missouri']]
  }

  PythonShell.run('state_total.py', options, (err, data) => {
    if (err) throw err

    console.log('results:', results)
  })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is running on PORT: ${PORT}`);
});
