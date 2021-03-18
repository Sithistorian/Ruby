const express = require('express')
const app = express()
const port = 3001
const SDCmongoDB = require('./mongoDB.js');
const SDCmysqlDB = require('./mysqlDB.js');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})