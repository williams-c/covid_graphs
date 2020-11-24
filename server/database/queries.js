const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginUser = (info) => {
  const username = info.username;
  const password = info.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log(hash)
  });
}

const signUpUser = (info) => {
  const username = info.username;
  const password = info.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      throw err;
    }
    const { Client } = require('pg')
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'CovidGraphs',
      password: '2327',
      port: 5432,
    })

    client.connect()
    return client.query('INSERT INTO users (username, pwd) VALUES ($1, $2)', [username, hash])
                 .then((data) => {
                   return data;
                 })
                 .catch((err) => {
                   throw err;
                 })
  });
}

module.exports = {
  loginUser,
  signUpUser,
}