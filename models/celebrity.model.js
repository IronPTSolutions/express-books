const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema ({
  name: String,
  occupation: String,
  catchPhrase: String,
  image: String
})

//Export the Celebrity model.
const Celebrity = mongoose.model('Celebrity', celebritySchema);
module.exports = Celebrity;