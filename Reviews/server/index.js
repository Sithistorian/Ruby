const express = require('express')
const app = express()
const port = 3001
const SDCmongoDB = require('./mongoDB.js');
const db = require('./mysqlDB.js');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get(`/reviews/`, (req, res) => {
  db.getReviews(req.query['product_id'], (err, data) => {
    if (err) {
      console.error('You reached an error here', err);
    } else {
      res.status(200).send(data);
      console.log('DATA FROM GET REVIEWS REQUEST', data);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})