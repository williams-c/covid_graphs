const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const csv = require('csv-parser')
const fs = require('fs')


const app = express();
const PORT = 3001;

app.use(cors())
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
  const dataPath = path.resolve('data_scripts', 'total_state.csv')
  res.sendFile(dataPath)
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is running on PORT: ${PORT}`);
});
