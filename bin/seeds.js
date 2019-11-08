const Celebrity = require('../models/celebrity.model');
const mongoose = require('mongoose');
require('../config/db.config');

const celebrities = [
  {
    name: "Rachel Green",
    occupation: "Ejecutiva at Ralph Lauren",
    catchPhrase: "Ahh, salmon skin roll",
    image: "https://media.giphy.com/media/2x2m2a9kNrl2U/giphy.gif"
  },
  {
    name: "Monica Geller",
    occupation: "Chef",
    catchPhrase: "We better stick to the routine, we don't want to lokk stupid",
    image: "https://media.giphy.com/media/XETyfVPrF1BI1RnHdJ/giphy.gif"
  },
  {
    name: "Joey Tribbiani",
    occupation: "Actor",
    catchPhrase: "Joey doesn't share food!",
    image: "https://media.giphy.com/media/yljSekdNwPOYE/giphy.gif"
  },
  {
    name: "Ross Geller",
    occupation: "Paleontologist",
    catchPhrase: "Turn, Pivot, PIVOT, PIVOT, PIVOOOOT",
    image: "https://media.giphy.com/media/3nfqWYzKrDHEI/giphy.gif"
  },
  {
    name: "Phoebe Buffay",
    occupation: "Massage Therapist",
    catchPhrase: "Smelly Cat, Smelly Cat, What are they feeding you? Smelly Cat, Smelly Cat, It's not your fauuuuult",
    image: "http://giphygifs.s3.amazonaws.com/media/4eoO0NSdNY11K/giphy.gif"
  },
  {
    name: "Chandler Bing",
    occupation: "Advertising",
    catchPhrase: "I've had a very long, hard day",
    image: "https://media.giphy.com/media/hrk8ehR4lCZ27FtjPA/giphy.gif"
  }
];

// Call the Celebrity model's create method with the array as argument.
// In the create method's callback, display feedback.

Celebrity.create(celebrities)
  .then((celebrities) => console.info(`${celebrities.length} new celebrities added to DataBase`))
  .catch(error => console.error(error))
  .then(() => mongoose.connection.close());
