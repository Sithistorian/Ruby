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

        const getReviewsPhotos = async function () {

          let dataPromise = new Promise ((resolve, reject) => {
            resolve(data);
          });
                 for (let i = 0; i < data.length; i++) {
                  await db.getPhotos(data[i].id, (err, photos) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log('before', data[i]);
                        dataPromise = dataPromise.then((data) => {
                         data[i].photos = photos;
                         return data;
                        });
                        console.log('after', data[i]);
                      }
                    })
                  }
          return dataPromise.then(data => {
            console.log(`BEFORE THE FOR LOOP?`, data)
            res.status(200).send(data)
          }).catch(err => {
            throw err;
          })
      }

      getReviewsPhotos()
        .then(console.log('THIS IS THE DATA AT THIS POINT', data))
    }
  })
})

// app.get('reviews/meta', (req, res) => )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})