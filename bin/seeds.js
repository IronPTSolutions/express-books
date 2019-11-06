const Celebrity = require('../models/celebrity.model')
const Movie = require('../models/movie.model')
const mongoose = require('mongoose')
require('../config/db.config')

// const celebrities = [
//   {
//     name: 'Tom Cruise',
//     occupation: 'actor',
//     catchPhrase: 'nothing ends nicely, that\'s why it ends'
//   },
//   {
//     name: 'Ed Sheeran',
//     occupation: 'signer',
//     catchPhrase: 'Be nice to everyone, always smile, and appreciate things because it could all be gone tomorrow'
//   },
//   {
//     name: 'Zlatan Ibrahimovic',
//     occupation: 'football player',
//     catchPhrase: 'Only God knows… You’re talking to him now'
//   }
// ]

// Celebrity.create(celebrities)
//   .then((celebrities) => {
//     console.log(`${celebrities.length} new celebities added to da database:`)
//     celebrities.map((celebrity, i) => console.log(`${i + 1} - ${celebrity.name}`))
//   })
//   .catch(err => console.log(`Error adding celebrities to the database: ${err}`))
//   .then(() => mongoose.connection.close())

// mongoose.connection.collection('celebrities').drop()
//   .then(() => console.log('deleted'))

const movies = [
  {
    title: 'The Godfather',
    genre: 'Drama',
    plot: 'The life of Vito Corleone, engaged in the difficult task of keeping the family together and mafia empire compact.'
  },
  {
    title: 'Pulp fiction',
    genre: 'gangster',
    plot: 'A killer falls in love with his boss’s wife, a boxer reneges on his promise, and a couple tries a robbery that quickly gets out of control.'
  },
  {
    title: 'Forrest Gump',
    genre: 'Drama',
    plot: 'Sitting on the bench at the Savannah bus stop, Forrest Gump slowly talks about his incredible life and the mental and physical problems he brings with him from birth.'
  }
]

Movie.create(movies)
  .then((movies) => {
    console.log(`${movies.length} new movies added to da database:`)
    movies.map((movie, i) => console.log(`${i + 1} - ${movie.title}`))
  })
  .catch(err => console.log(`Error adding celebrities to the database: ${err}`))
  .then(() => mongoose.connection.close())