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
  const { Client } = require('pg')
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'CovidGraphs',
    password: '2327',
    port: 5432,
  })

  client.connect()
  return client.query('SELECT * FROM users WHERE username = $1', [username])
               .then((data) => {
                 if (data.rows.length > 0) {
                   throw 'Username taken'
                 } else {
                    return bcrypt.hash(password, saltRounds)
                 }
               })
               .then((hash) => {
                  return client.query('INSERT INTO users (username, pwd) VALUES ($1, $2)', [username, hash])
               })
               .then((data) => { return data })
               .catch((err) => { throw err })

}

module.exports = {
  loginUser,
  signUpUser,
}