let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'SDC'
})

connection.connect()

const getReviews = function (product_id, callback) {

  //I want to get all the reviews with the photos but non of the reviews that have been reported i.e. have a 1 for their reported value

  let queryString = `SELECT * FROM Reviews WHERE product_id = ?`

  connection.query(queryString, [product_id], (err, data) => {
    if (err) {
      callback(err);
      console.error(err, null);
    } else {
      callback(null, data);
    }

  })

}

console.log(getReviews(
  1, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    return data;
  }
}));


module.exports.connection = {
  getReviews
};