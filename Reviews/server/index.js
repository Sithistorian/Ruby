const express = require('express')
const app = express()
const port = 3001
const SDCmongoDB = require('./mongoDB.js');
const db = require('./mysqlDB.js');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

let sortBy = function (data, filter) {
  if (filter === 'newest') {
    data.sort((a, b) => {
      b.date - a.date
      return data;
    })
  } else if (filter === 'helpuful') {
    data.sort((a, b) => {
      b.helpfulness - a.helpfulness
      return data;
    })
  }
}

let shapeReviewsData = function (data) {

  let tracker = {};

  for (let i = 0; i < data.length; i++) {
    if (tracker[data[i].review_id] === undefined) {
      tracker[data[i].review_id] = {index: i, photos: [{id: data[i].photo_id, url: data[i]._url}]}
      delete data[i].photo_id,
      delete data[i].reviewId,
      delete data[i]._url
    } else {
      tracker[data[i].review_id].photos.push({id: data[i].photo_id, url: data[i]._url});
      data.splice(i, 1);
      i--;
    }
  }
    for (let j = 0; j < data.length; j++) {
      if (tracker[data[j].review_id].photos[0].id === null) {
        data[j].photos = [];
      } else {
        data[j].photos = tracker[data[j].review_id].photos
      }
    }
  return data;
}

app.get(`/reviews/`, (req, res) => {

  db.getReviews(req.query['product_id'], (err, data) => {
    if (err) {
      console.error('You reached an error here', err);
    } else {
      let shapedData = shapeReviewsData(data);

      if (req.query['sort']) {
        sortBy(data, req.query['sort'])
        res.status(200).send({
          "product": req.query['product_id'],
          "page": req.query['page'],
          "count": req.query['count'],
          "results": shapedData
        })
      } else {
        res.status(200).send({
          "product": req.query['product_id'],
          "page": req.query['page'],
          "count": req.query['count'],
          "results": shapedData
        })
      }


      //   const getReviewsPhotos = async function () {

      //     let dataPromise = new Promise ((resolve, reject) => {
      //       resolve(data);
      //     });
      //            for (let i = 0; i < data.length; i++) {
      //             await db.getPhotos(data[i].id, (err, photos) => {
      //                 if (err) {
      //                   console.error(err);
      //                 } else {
      //                   console.log('before', data[i]);
      //                   dataPromise = dataPromise.then((data) => {
      //                    data[i].photos = photos;
      //                    return data;
      //                   });
      //                   console.log('after', data[i]);
      //                 }
      //               })
      //             }
      //     return dataPromise.then(data => {
      //       console.log(`BEFORE THE FOR LOOP?`, data)
      //       res.status(200).send(data)
      //     }).catch(err => {
      //       throw err;
      //     })
      // }

      // getReviewsPhotos()
      //   .then(console.log('THIS IS THE DATA AT THIS POINT', data))
    }
  })
})



// app.get('reviews/meta', (req, res) => )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})