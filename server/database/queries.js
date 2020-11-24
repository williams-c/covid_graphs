const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginUser = (info) => {
  const username = info.username;
  const password = info.password;

    const { Client } = require('pg')
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'CovidGraphs',
      password: '2327',
      port: 5432,
    })
    client.connect()
    return client.query('SELECT pwd FROM users WHERE username = $1', [username])
                 .then((data) => {
                   return new Promise ((resolve, reject) => {bcrypt.compare(password, data.rows[0].pwd, (err, result) => {
                     if (err) reject(err);
                     resolve(result);
                   })
                  })
                 })
                 .catch((err) => {
                   throw err
                 })
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
    return client
             .query('INSERT INTO users (username, pwd) VALUES ($1, $2)', [username, hash])
             .then((data) => { return data })
             .catch((err) => { throw err })
  });
}

module.exports = {
  loginUser,
  signUpUser,
}