let mysql = require('mysql2');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'SDC'
})

connection.connect()

const getReviews = function (product_id, callback) {

  // let queryString = `SELECT * FROM Reviews WHERE product_id = ? AND reported = 0`

  let queryString = `SELECT * FROM Reviews LEFT JOIN Photos ON Reviews.review_id = Photos.reviewId WHERE Reviews.product_id = ? AND reported = 0`

  connection.query(queryString, [product_id], (err, data) => {
    if (err) {
      callback(err);
      console.error(err, null);
    } else {
      callback(null, data);
    }
  })
}

const getPhotos = function (review_id, callback) {

  let queryString = `SELECT * FROM Photos WHERE review_id = ?`

  connection.query(queryString, [review_id], (err, data) => {
    if (err) {
      callback(err);
      console.error(err, null);
    } else {
      callback(null, data);
    }
  })
}

const addReview = function(review, callback) {

  let queryString = `INSERT INTO Reviews (rating, summary, recommend, reported, response, body, date, reviewer_name, helpfulness, product_id, reviewer_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(queryString, [
    review.rating,
    review.summary,
    review.recommend,
    review.reported,
    review.response,
    review.body,
    review.date,
    review.reviewer_name,
    review.helpfulness,
    review.product_id,
    review.reviewer_email
  ], (err, data) => {
    if (err) {
      callback(err);
      console.error(err, null);
    } else {
      callback(null, data);
    }
  })
}

const updateHelpfulness = function(review_id, helpfulness, callback) {

  //need to refactor to add 1

  let queryString = `UPDATE Reviews Set helpfulness = ? WHERE review_id = ?`;

  connection.query(queryString, [helpfulness, review_id], (err, data) => {
    if (err) {
      callback(err, null);
      console.error('Error!', err);
    } else {
      callback(null, data);
      console.log('Helpfulness added');
    }
  } )
}

const updateReported = function(review_id, callback) {

  let queryString = `UPDATE Reviews Set reported = 1 WHERE review_id = ?`;

  connection.query(queryString, [review_id], (err, data) => {
    if (err) {
      callback(err, null);
      console.error('Error!', err);
    } else {
      callback(null, data);
      console.log('Helpfulness added');
    }
  } )
}

const getMetaData = function(product_id, callback) {

  let queryString = `SELECT Reviews.rating, Reviews.recommend, Characteristics._name FROM Reviews INNER JOIN Characteristics ON Reviews.product_id = Characteristics.product_id WHERE Reviews.product_id = ? AND reported = 0`

  connection.query(queryString, [product_id], (err, data) => {
    if (err) {
      callback(err, null);
      console.error('Error', err);
    } else {
      callback(null, data);
      console.log(data);
    }
  })
}


// updateReported(5777924, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     return data;
//   }
// });

// updateHelpfulness(5777924, 3, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     return data;
//   }
// });

// console.log(addReview({
//   rating: 900,
//   summary: 'Tristan added this review',
//   recommend: 1,
//   reported: 0,
//   response: 'This is Tristans response',
//   body: 'body yody yody yody yody',
//   date: '2004-12-4',
//   reviewer_name: 'Tristan',
//   helpfulness: 1,
//   product_id: 1,
//   reviewer_email: 'Tristan@your.moms'
// }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     console.log('Review added');
//   }
// }));


// console.log(getReviews(2, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     return data;
//   }
// }));

// console.log(getReviews(
//   , (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     return data;
//   }
// }));

// console.log(getPhotos(5
//   , (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     return data;
//   }
// }));

// console.log(getMetaData(377790, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//       return data;
//     }
//   }));


module.exports = {
  getReviews,
  getPhotos,
  addReview,
  updateHelpfulness,
  updateReported
};