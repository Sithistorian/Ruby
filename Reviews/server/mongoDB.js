const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDCmongoDB', {useNewUrlParser: true, useUnifiedTopology: true})


let ReviewsSchema = {
  rating: Number,
  summary: String,
  recommended: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewerName: String,
  helpfulness: Number,
  productId: Number,
  email: String,
  photos: Array,
}

let ReviewPhotoSchema = {
  id: Number,
  url: String,
}

let CharacteristicsSchema = {
  name: String,
  id: Number,
}

let Review = mongoose.model('review', ReviewsSchema);
let ReveiwPhotos = mongoose.model('reviewPhoto', ReviewPhotoSchema);
let Characteristics = mongoose.model('characteristic', CharacteristicsSchema);


