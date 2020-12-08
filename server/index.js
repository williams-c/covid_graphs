const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const axios = require('axios')
const cors = require('cors')
const { PythonShell } = require('python-shell')
const { getDate } = require('./server_helpers/getDate')
const stringify = require('csv-stringify');
require('dotenv').config()
const queries = require('./database/queries')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// routes
app.use('/data', express.static(path.join(__dirname, 'static_csv')));
const total = require('./routes/total')
app.use('/total', total);
const daily = require('./routes/daily')
app.use('/daily', daily);
const change = require('./routes/change')
app.use('/change', change);
const list = require('./routes/list')
app.use('/list', list);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

app.post('/login', async (req, res) => {
  try{
    let data = await queries.loginUser(req.body)
    if (data) {
      res.sendStatus(200)
    } else {
      throw 'Invalid Password'
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/sign-up', async (req, res) => {
  try{
    let data = await queries.signUpUser(req.body)
    console.log(data)
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/testing_locations', (req, res) => {
  const lat = req.query.lat
  const long = req.query.long
  axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
    headers: {'Access-Control-Allow-Origin': '*'},
    params : {
      key: process.env.PLACES_API_KEY,
      query: 'covid testing',
      location: `${lat},${long}`,
      radius: 10000,
      origin: '*',
    }
    })
    .then((data) => {
      res.send(data.data)
    })
    .catch((err) => console.error(err))
})

app.listen(PORT, () => {
  console.log(`Your server is running on PORT: ${PORT}`);
});
