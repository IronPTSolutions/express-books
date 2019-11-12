const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  director: String,
  writers: String,
  stars: String,
  rate: 8
})