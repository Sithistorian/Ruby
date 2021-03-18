let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'SDC'
})

connection.connect()

const getReviews = function (product_id, callback) {

  let queryString = `SELECT * FROM Reviews WHERE product_id = ? AND reported = 0`

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



console.log(getReviews(
  2, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    return data;
  }
}));

// console.log(getReviews(
//   6, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//     return data;
//   }
// }));


module.exports.connection = {
  getReviews
};